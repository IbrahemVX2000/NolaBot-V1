import { readFileSync, readdirSync } from 'fs';
import { resolve as resolvePath } from 'path';
import { execSync } from 'child_process';
import logger from './logger.js';


function getDependencies(plgPath) {
    let string = readFileSync(plgPath, 'utf-8');
    let results = [];

    let importStatements = string.match(/import\s+.*?from\s+['"].*?['"]|import\s+['"].*?['"]/g) || [];
    let importCallStatements = string.match(/import\(['"`].*?['"`]\)/g) || [];

    let allStatements = [...importStatements, ...importCallStatements];

    allStatements.forEach(statement => {
        let moduleName = statement.match(/['"`].*?['"`]/)[0]?.replace(/['"`]/g, '');
        moduleName = moduleName.split('/')[0].startsWith('@') ?
            moduleName.split('/').slice(0, 2).join('/') :
            moduleName.split('/')[0];

        results.push(moduleName);
    });

    results = [...new Set(results)];
    results = results.filter(moduleName => {
        return moduleName && !moduleName.startsWith('.') && !moduleName.startsWith('/');
    });

    return results;
}

function getDependenciesCommonJS(plgPath) {
    let string = readFileSync(plgPath, 'utf-8');
    let results = [];

    let requireStatements = string.match(/require\(['"`].*?['"`]\)/g) || [];

    requireStatements.forEach(statement => {
        let moduleName = statement.match(/['"`].*?['"`]/)[0]?.replace(/['"`]/g, '');
        moduleName = moduleName.split('/')[0].startsWith('@') ?
            moduleName.split('/').slice(0, 2).join('/') :
            moduleName.split('/')[0];

        results.push(moduleName);
    });

    results = [...new Set(results)];
    results = results.filter(moduleName => {
        return moduleName && !moduleName.startsWith('.') && !moduleName.startsWith('/');
    });

    return results;
}

async function installDependencies(dependencies, pluginName, plgPath) {
    if (!dependencies || !Array.isArray(dependencies)) return;
    if (!pluginName || typeof pluginName !== 'string') return;
    let installed = [], failed = false;
    const fileName = plgPath.split('\\').pop();

    const notInstalled = [];
    for (const dependency of dependencies) {
        try {
            await import(dependency);
        } catch {
            notInstalled.push(dependency);
        }
    }

    if (notInstalled.length > 0) logger.custom(`Installing dependencies for ${fileName}`, 'LOADER', "pink");
    else return true;

    for (const dependency of notInstalled) {
        try {
            execSync(`npm install --package-lock false ${dependency}`, { stdio: 'ignore' });
            logger.custom(`Installed dependency ${dependency}`, 'LOADER', 'pink');
            installed.push(dependency);
        } catch (err) {
            logger.custom(`Can't install dependency ${dependency}`, 'LOADER', 'error');
            logger.custom(err.message || err, 'LOADER', 'error');

            failed = true;
            break;
        }
    }

    if (failed) {
        logger.custom('Install failed, reversing...', 'LOADER', 'error');
        execSync(`npm uninstall --package-lock false ${installed.join(' ')}`, { stdio: 'ignore' });

        logger.custom('Reversed dependencies installation!', 'LOADER', 'pink');

        return false;
    }

    return true;
}

async function loadPlugins() {
    logger.custom('Reading plugins dependencies...', 'LOADER', 'pink');
    const pluginsPath = resolvePath(process.cwd(), 'plugins');
    const plugins = ["commands", "events", "customs", "onMessage"];

    for (const plugin of plugins) {
        logger.custom(`Reading dependencies for ${plugin}...`, 'LOADER', 'pink');
        const pluginPath = resolvePath(pluginsPath, plugin);
        if (plugin === "commands") {
            const categoryFolders = readdirSync(pluginPath);
            for (const categoryFolder of categoryFolders) {
                const categoryFolderPath = resolvePath(pluginPath, categoryFolder);
                const files = readdirSync(categoryFolderPath).filter(e => e.endsWith(".js") || e.endsWith(".cjs") || e.endsWith(".mjs"));
                for (const file of files) {
                    const filePath = resolvePath(categoryFolderPath, file);
                    const dependencies = getDependencies(filePath);
                    const dependenciesCommonJS = getDependenciesCommonJS(filePath);
                    const dependenciesAll = Array.from(new Set([...dependencies, ...dependenciesCommonJS]));

                    await installDependencies(dependenciesAll, file, filePath);
                }
            }
        } else {
            const files = readdirSync(pluginPath).filter(e => e.endsWith(".js") || e.endsWith(".cjs") || e.endsWith(".mjs"));
            for (const file of files) {
                const filePath = resolvePath(pluginPath, file);
                const dependencies = getDependencies(filePath);
                const dependenciesCommonJS = getDependenciesCommonJS(filePath);
                const dependenciesAll = Array.from(new Set([...dependencies, ...dependenciesCommonJS]));

                await installDependencies(dependenciesAll, file, filePath);
            }
        }

    }
}


export default loadPlugins;
