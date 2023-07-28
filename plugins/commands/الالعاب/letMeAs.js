const config = {
    name: "لوكنت",
    aliases: ["لو كنت"],
    description: "لوكنت شخصية انمي / كرتون/ فلم/ حمار",
    cooldown: 15,
    credits: "IbrahemVX2000",
}


//anime
const selected = [
  {
    body: "ناروتو",
    url: "https://i.postimg.cc/nrLndm3m/E4z0f9-PXw-Ag-Bua-B.jpg"
  },
  {
    body: "ساسكي",
    url: "https://pbs.twimg.com/media/Fc9GE-1X0AAD8tn.jpg"
  },
  {
    body: "ساكورا",
    url: "http://pm1.narvii.com/8159/08627c7299d295cc08fc8e34f5c281dd10f3c3a1r1-683-683v2_00.jpg"
  },
  {
    body: "ايتاشي",
    url: "https://1.bp.blogspot.com/-yK401nTvb5o/YTUoweI3SDI/AAAAAAACQZo/Gk5Pmj0-uJEFotGYVCcVWrSt-ko-z3ehgCLcBGAsYHQ/s720/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f357374626a75586e676b483431673d3d2d3733373731313830392e31356132616566333835363463313236333.jpg"
  },
  {
    body: "مادارا",
    url: "http://pm1.narvii.com/6595/f47b527fe8de15d37eee8adf3a65632a22ab4506_00.jpg"
  },
  {
    body: "ميكاسا",
    url: "https://pm1.narvii.com/7224/aeb30f72f9b604ae880a780b627e477e4e09ce26r1-444-794v2_hq.jpg"
  },
  {
    body: "ليفاي",
    url: "http://pm1.narvii.com/6650/5d157cd7af79260fed9fefff8c8432f50b76efbc_00.jpg"
  },
  {
    body: "إيرين ",
    url: "https://i.postimg.cc/KzMVrDSj/184048676-328649945360939-1677855249607930404-n.jpg"
  },
  {
    body: "أرمين",
    url: "https://i.pinimg.com/564x/8b/15/8c/8b158c57b3f1bdc39bb002cf9855f61e.jpg"
  },
  {
    body: "ميساكي",
    url: "https://i.pinimg.com/564x/6d/26/fe/6d26fe3ff070e5bd684615c715fa6258.jpg"
  },
  {
    body: "يوكي",
    url: "https://i.pinimg.com/564x/84/97/d6/8497d6f16d37a3727a2c71fd55c231de.jpg"
  },
  {
    body: "توهرو",
    url: "https://i.pinimg.com/564x/a6/8d/cc/a68dcc35a5784f6b315f185484544284.jpg"
  },
  {
    body: "يوكينا",
    url: "https://i.pinimg.com/564x/9f/74/9d/9f749de4325e1f122a973a98fb989138.jpg"
  },
  {
    body: "كينشين",
    url: "https://i.pinimg.com/564x/83/9d/55/839d552bf8e7ebf9ddeaf03176cdb5aa.jpg"
  },
  {
    body: "شيشي",
    url: "https://i.pinimg.com/564x/82/73/e8/8273e824851a794f2cd821323553648a.jpg"
  },
  {
    body: "زورو",
    url: "https://i.pinimg.com/564x/3c/af/b2/3cafb25cd31d03f9be2bc44c77214394.jpg"
  },
  {
    body: "لوفي",
    url: "https://i.pinimg.com/564x/ac/6a/61/ac6a61a044e7e92c01d64c81122e158f.jpg"
  },
  {
    body: "نامي ",
    url: "https://i.pinimg.com/564x/23/2d/ed/232dedae31ccff6e93c2c3afddf061f9.jpg"
  },
  {
    body: "سانجي",
    url: "https://i.pinimg.com/564x/a2/5b/25/a25b25b90575859616ed487b6eb75c3c.jpg"
  },
  {
    body: "يوسوب",
    url: "https://i.pinimg.com/564x/27/99/0c/27990c88db1059d6753d8facbf16f8e9.jpg"
  },
  {
    body: "توبي",
    url: "https://i.pinimg.com/564x/44/50/de/4450defd18e512cd6f2c88ea2a52c6ff.jpg"
  },
  {
    body: "ديدارا",
    url: "https://i.pinimg.com/564x/71/2c/56/712c56145f5f10737114636e5faebca3.jpg"
  },
  {
    body: "ساي",
    url: "https://i.pinimg.com/564x/e8/24/94/e82494519df95866a9d08751a25dfd83.jpg"
  },
  {
    body: "ساكورا",
    url: "https://gray-kmvt-prod.cdn.arcpublishing.com/resizer/xXI6wbjAushkfjCcuuclImXgQ1M=/1200x675/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/2FM5QLL6X5N6HNQDONQJC4KB2Y.jpg"
  },
  {
    body: "كاكاشي",
    url: "https://i.pinimg.com/564x/d7/a0/e1/d7a0e1bba2a89db69b19d780a05c9091.jpg"
  },
  {
    body: "روك لي",
    url: "https://i.pinimg.com/564x/0f/ce/39/0fce39e6131ea5dbec1b3fd69303df1c.jpg"
  },
  {
    body: "غاارا",
    url: "https://i.pinimg.com/564x/e0/6d/a5/e06da57de53741c329cb5883923f1431.jpg"
  },
  {
    body: "كانامي",
    url: "https://i.pinimg.com/564x/a9/a2/78/a9a278ecb57803fe701bed58d611a996.jpg"
  },
  {
    body: "يوكي",
    url: "https://i.pinimg.com/564x/34/e1/79/34e179cd8e2a66d390dff13f3a4d3ecb.jpg"
  },
  {
    body: "يوكيتيرو",
    url: "https://i.pinimg.com/564x/c2/7f/b1/c27fb13cbc9a36ec81dd796fc5ac20f5.jpg"
  },
  {
    body: "يونو ",
    url: "https://i.pinimg.com/564x/5e/c1/60/5ec16005706fac5df0ef72be5a334850.jpg"
  },
  {
    body: "آش كيتشوم",
    url: "https://i.pinimg.com/564x/98/bc/35/98bc3565b73bc34066fcad783c51fcee.jpg"
  },
  {
    body: "بيكاتشو",
    url: "https://i.pinimg.com/564x/9d/c7/b1/9dc7b155890a9f115d65a1e19ae87f09.jpg"
  },
  {
    body: "كارين",
    url: "https://i.pinimg.com/564x/57/38/7a/57387a4cf7d53c6b125ba32cb007c857.jpg"
  },
  {
    body: "سيرينا",
    url: "https://i.pinimg.com/564x/c0/5f/77/c05f77766455bf62f8a73d2cd7beb6fb.jpg"
  },
  {
    body: "جيمس",
    url: "https://i.pinimg.com/736x/42/7f/69/427f6983b81e709d1e7fddbfb1440c61.jpg"
  },
  {
    body: "جيسي",
    url: "https://i.pinimg.com/564x/61/41/8e/61418ec3456ef808ab1c929c627d2ad3.jpg"
  },
  {
    body: "تويا",
    url: "https://i.pinimg.com/564x/5a/84/63/5a8463ad69e3212167d0b1a6574e3d7d.jpg"
  },
  {
    body: "ناغيسا",
    url: "https://i.pinimg.com/564x/69/77/d1/6977d13b697b0bb0773b6e5be3da720d.jpg"
  },
  {
    body: "هاروهي",
    url: "https://i.pinimg.com/564x/c0/0c/32/c00c32b500ef659b5ba462a87e632583.jpg"
  },
  {
    body: "كيون",
    url: "https://i.pinimg.com/564x/a0/a6/7d/a0a67da07b392734fe13eee64ce099f6.jpg"
  },
  {
    body: "تاماكي",
    url: "https://i.pinimg.com/564x/e6/f3/c3/e6f3c38c3e4719f5040dbc4510b8cf25.jpg"
  }
];


//carton

const selectedCarton = [
  {
    body: "دورا",
    url: "https://www.mizogames.com/uploads/2020/05/dora-spot-the-difference-game.jpeg"
  },
  {
    body: "سوبرمان",
    url: "https://upload.wikimedia.org/wikipedia/ar/7/72/Superman.jpg"
  },
  {
    body: "ميكي ماوس",
    url: "https://i.pinimg.com/564x/84/e5/ee/84e5eef53e1fa95330c37ed7e339c094.jpg"
  },
  {
    body: "بطوط",
    url: "https://i.pinimg.com/564x/96/50/c1/9650c178bb84f1c39e44ddfa85f55773.jpg"
  },
  {
    body: "دافي",
    url: "https://i.pinimg.com/564x/21/ac/06/21ac065b216eebd2ea938a684ccb9c46.jpg"
  },
  {
    body: "باغز باني",
    url: "https://i.pinimg.com/564x/fc/6a/e9/fc6ae954d1c263d0bf9ab1a8f1455bf3.jpg"
  },
  {
    body: "سيلفستر",
    url: "https://i.pinimg.com/564x/89/ed/7c/89ed7c5342fd6c13078089c4a1701ce2.jpg"
  },
  {
    body: "جيري",
    url: "https://i.pinimg.com/564x/24/33/0b/24330b259cfe7429541beddee43f4cea.jpg"
  },
  {
    body: "الفار الطباخ ",
    url: "https://i.pinimg.com/564x/92/ff/27/92ff27b1e3cf87f459f988f44c6c4aa9.jpg"
  },
  {
    body: "نيمو ",
    url: "https://i.pinimg.com/564x/50/87/e6/5087e636cf398024e793f1082ba844cb.jpg"
  },
  {
    body: "ديو",
    url: "https://i.pinimg.com/564x/81/45/da/8145da19ddc2152cd255a0c73f9c8e0b.jpg"
  },
  {
    body: "بن تن",
    url: "https://i.pinimg.com/564x/72/19/50/72195035fe31047b117c14a558c18128.jpg"
  },
  {
    body: "سبونج بوب",
    url: "https://i.pinimg.com/564x/4d/ee/67/4dee67174360ffff5a9ade3a475a6a5a.jpg"
  },
  {
    body: "باتمان",
    url: "https://i.pinimg.com/564x/32/34/57/3234572271c20c71889d9f57c7cea7e8.jpg"
  },
  {
    body: "ووفر",
    url: "https://i.pinimg.com/564x/ab/09/ff/ab09ffdbb3e493fdb762459cfe1e951d.jpg"
  },
  {
    body: "سبايدرمان",
    url: "https://i.pinimg.com/564x/d3/13/2e/d3132ed99dae06a69fdd9680fc8bc00b.jpg"
  },
  {
    body: "الأميرة جاسمين",
    url: "https://i.pinimg.com/564x/2d/8a/cb/2d8acbf007a9eda89ffd3eb986e42091.jpg"
  },
  {
    body: "الأميرة أورورا",
    url: "https://i.pinimg.com/564x/75/d3/48/75d348b4c1875367ee7f4674435bf40f.jpg"
  },
  {
    body: "الأميرة آنا",
    url: "https://i.pinimg.com/564x/ca/79/2f/ca792fd26ee2198ba7749e45a21d633a.jpg"
  },
  {
    body: "الأميرة إلسا",
    url: "https://i.pinimg.com/564x/4c/1f/27/4c1f2791efbc9ae6b8ec10d1b6713d05.jpg"
  },
  {
    body: "الأميرة سندريلا",
    url: "https://i.pinimg.com/564x/86/b3/ae/86b3ae383dd53ceda43dc357802cb13d.jpg"
  },
  {
    body: "الأميرة تيانا ",
    url: "https://i.pinimg.com/564x/23/60/39/236039402ae61cfb394cc13acb74b3b0.jpg"
  },
  {
    body: "الأميرة ميريدا ",
    url: "https://i.pinimg.com/564x/bc/df/69/bcdf69fa907a1dc0a5ba57f24ed9735e.jpg"
  },
  {
    body: "الأميرة بيل",
    url: "https://i.pinimg.com/564x/c2/80/b2/c280b211e222ae9a6cab48d739467705.jpg"
  },
  {
    body: "الأميرة رابونزيل",
    url: "https://i.pinimg.com/564x/34/67/3c/34673c070558090629241a3f946ca94e.jpg"
  },
  {
    body: "الأميرة موانا ",
    url: "https://i.pinimg.com/564x/f8/e9/05/f8e905d8b88bb951b383fdb496151863.jpg"
  },
  {
    body: "سالي",
    url: "https://i.pinimg.com/564x/58/4d/62/584d62fb0064c022ccd6efe539bb31f0.jpg"
  },
  {
    body: "باربي",
    url: "https://i.pinimg.com/236x/52/4e/90/524e90a9cc982df826a7608f7f4aed05.jpg"
  },
  {
    body: "ماشا ",
    url: "https://i.pinimg.com/236x/54/f1/83/54f183cd93b0b972a63beccb91902b04.jpg"
  },
  {
    body: "هومر سيمبسون",
    url: "https://i.pinimg.com/236x/11/c7/48/11c7483b1deb56823c276931302be146.jpg"
  },
  {
    body: "بارت سيمبسون",
    url: "https://i.pinimg.com/236x/af/f5/7f/aff57fa62a0c4b5adb42dbcc39ce66ff.jpg"
  }
];

//monky
const selectedMonky = [
  {
    body: "انت اصلا حمار ما يحتاج تكتب لو كنت",
    url: "https://vid.alarabiya.net/legacy/images/2009/12/23/28465_95007.jpg"
  }
];

//moives
const selectedMoive = [
  {
    body: "هاري بوتر",
    url: "https://static.hiamag.com/styles/autox754/public/article/03/12/2022/unknown_291360745_5461894380528368_2747329774234587438_n_0.jpg"
  },
  {
    body: "رون ويزلي",
    url: "https://i.dailymail.co.uk/1s/2020/12/30/17/37417894-9099601-image-a-9_1609350125748.jpg"
  },
  {
    body: "هيرميون جرينجر",
    url: "https://i.pinimg.com/236x/20/3f/93/203f938afbd8613396c04e4f1539c056.jpg"
  },
  {
    body: "سيفورس سنيب",
    url: "https://i.pinimg.com/564x/48/cd/00/48cd00242fa777039ce7b8df5d70d526.jpg"
  },
  {
    body: "آلباص دمبلدور",
    url: "https://i.pinimg.com/236x/8f/d1/83/8fd183b4dc31a5b4c62f26d789356d75.jpg"
  },
  {
    body: "لوك سكاي ووكر",
    url: "https://i.pinimg.com/236x/50/47/2b/50472bec3fc624d945b4078df5a50514.jpg"
  },
  {
    body: "دارث فيدر",
    url: "https://i.pinimg.com/236x/3c/1d/5b/3c1d5ba525aef342f6f380b97063268b.jpg"
  },
  {
    body: "أوبي وان كينوبي",
    url: "https://i.pinimg.com/236x/46/15/eb/4615eb5705c0ecd701e058a53bdfd3e2.jpg"
  },
  {
    body: "هان سولو",
    url: "https://i.pinimg.com/236x/21/e0/2a/21e02a06798f59237d0276612d9ad057.jpg"
  },
  {
    body: "ليا أورجانا",
    url: "https://i.pinimg.com/236x/6e/07/c9/6e07c96dc2c31829d5760ff216618910.jpg"
  },
  {
    body: "فروزن",
    url: "https://i.pinimg.com/236x/d5/d9/c6/d5d9c6e739a7da7a53aed123df80f0e2.jpg"
  },
  {
    body: "وودي",
    url: "https://i.pinimg.com/564x/4c/11/7c/4c117c09926480612f2a43e8df67d0e7.jpg"
  },
  {
    body: "فيريس بيولر",
    url: "https://i.pinimg.com/236x/4b/d6/d1/4bd6d1b9e1ed5cbe25225ba9f358f492.jpg"
  },
  {
    body: "جون ماكلين",
    url: "https://i.pinimg.com/236x/41/41/3b/41413b84d9d7f88d6e95339e8453a376.jpg"
  },
  {
    body: "ماريا هيل",
    url: "https://i.pinimg.com/236x/2b/97/8f/2b978ff004db6eb775ce3ef01732e148.jpg"
  },
  {
    body: "توني ستارك",
    url: "https://i.pinimg.com/236x/63/33/bd/6333bd77ce953e4ad5891c0aad1d1ba1.jpg"
  },
  {
    body: "ستيف روجرز ",
    url: "https://i.pinimg.com/236x/36/01/b3/3601b349f9f4b95528d7a85104c5ff15.jpg"
  },
  {
    body: "ناتاشا رومانوف ",
    url: "https://i.pinimg.com/236x/e0/a5/38/e0a5382a2eb1bba14fa28534756a3ad6.jpg"
  },
  {
    body: "تشادويك بوسمان ",
    url: "https://i.pinimg.com/236x/72/e2/fc/72e2fce425eee118dd25dd5f5657b2e2.jpg"
  },
  {
    body: "بروس واين",
    url: "https://i.pinimg.com/236x/f4/95/6e/f4956ece79fa2e5b919a3ad7d04221b8.jpg"
  },
  {
    body: "كلارك كنت",
    url: "https://i.pinimg.com/236x/78/ec/fe/78ecfecbae40c42c4d579eb35197b959.jpg"
  },
  {
    body: "لوثر ",
    url: "https://i.pinimg.com/236x/12/f3/f7/12f3f7d866d26bfe65551d0ceefbef6b.jpg"
  },
  {
    body: "هارفي دنت",
    url: "https://i.pinimg.com/236x/37/d1/ef/37d1ef274ed242979147cac5a722fe6b.jpg"
  },
  {
    body: "جيمس جوردون",
    url: "https://i.pinimg.com/236x/52/45/bc/5245bc735fcbf0648c2059fd9933041c.jpg"
  },
  {
    body: "بينجامين باتون ",
    url: "https://i.pinimg.com/236x/2d/6b/38/2d6b382de8e45b43d0ee735e3356e8e3.jpg"
  },
  {
    body: "تايلور دوردان",
    url: "https://i.pinimg.com/236x/bd/fb/be/bdfbbe05fe38a02fc3093ec201dcda0a.jpg"
  },
  {
    body: "مارلون براندو",
    url: "https://i.pinimg.com/236x/19/53/30/1953304148c487149e5cc6ec7a6ecd86.jpg"
  },
  {
    body: "ألبا ساورو",
    url: "https://i.pinimg.com/236x/4e/90/ec/4e90ec479dcd65f654c19a77a4a8f3a7.jpg"
  },
  {
    body: "جوني ديب",
    url: "https://i.pinimg.com/236x/50/c6/29/50c629a65251812d51c332e2f1886b49.jpg"
  },
  {
    body: "هيث ليدجر",
    url: "https://i.pinimg.com/236x/0f/4e/7c/0f4e7c584c8f0860a35ce1c55d037153.jpg"
  },
  {
    body: "دون كيهوتي",
    url: "https://i.pinimg.com/236x/30/9d/a8/309da8d6b025600fe42192aa757fac12.jpg"
  },
  {
    body: "سانشو بانزا",
    url: "https://i.pinimg.com/236x/5e/62/2b/5e622ba2c4eec8988802ad0e1f4f176c.jpg"
  },
  {
    body: "ويلسي",
    url: "https://i.pinimg.com/236x/49/64/0e/49640e010e363ef59f5b1b89c282cf56.jpg"
  },
  {
    body: "روز ويسلي",
    url: "https://i.pinimg.com/236x/0e/a4/cf/0ea4cf6a4b00feebdcbeaa33450b8a4f.jpg"
  },
  {
    body: "جورج ويسلي",
    url: "https://i.pinimg.com/236x/34/36/ec/3436ece81d7cf1d0b90f163b1faa7796.jpg"
  },
  {
    body: "نورمان بيتس",
    url: "https://i.pinimg.com/236x/e5/42/6a/e5426ab9b5a4be2f1f134274c50b7704.jpg"
  },
  {
    body: "توماس شيلبي",
    url: "https://i.pinimg.com/236x/fd/0a/be/fd0abef6976a7b49b79066e71499f036.jpg"
  },
  {
    body: "جيمي ماكغريدي",
    url: "https://i.pinimg.com/236x/13/81/cf/1381cf395d12ff5c0bd34fb60502ae6a.jpg"
  },
  {
    body: "والتر وايت",
    url: "https://i.pinimg.com/236x/82/ab/76/82ab76f9a3e4319c043a2b155afa1fe7.jpg"
  },
  {
    body: "جيسي بينكمان ",
    url: "https://i.pinimg.com/236x/bd/8c/b3/bd8cb3e2c0645ba960fd60d7dd214fb0.jpg"
  }
];

//حشرة
const selectedAnti = [
  {
    body: "العنكبوت الطائر",
    url: "https://i.pinimg.com/564x/98/60/f0/9860f0c9d3b19c3cc0f3d84c1fde1d03.jpg"
  },
  {
    body: "الصرصور المدرع",
    url: "https://i.postimg.cc/c4742R7N/V-orig-madagascar-hissing-cockroach.jpg"
  },
  {
    body: "الفراشة البيضاء",
    url: "https://www.laughinghills.com/wordpress/wp-content/uploads/2020/08/Cabbage-White-Butterfly_20200822_wp1.jpg"
  },
  {
    body: "النملة السوبر",
    url: "https://i2-prod.mirror.co.uk/incoming/article8505172.ece/ALTERNATES/s1200d/Ant.jpg"
  },
  {
    body: "الجراد الراقص",
    url: "https://live.staticflickr.com/8445/8020893204_c1a160e62e_b.jpg"
  },
  {
    body: "الخنفساء النبيلة",
    url: "https://a-z-animals.com/media/2021/09/Ladybug-on-green-leaf--400x300.jpg"
  },
  {
    body: "العثة الضخمة",
    url: "https://community.rspb.org.uk/cfs-file/__key/CommunityServer.Blogs.Components.WeblogFiles/notesonnature/privet_5F00_7925.JPG"
  },
  {
    body: "السوسة المسالمة",
    url: "https://smithspestmanagement.com/wp-content/uploads/2021/10/silverfish.jpg"
  },
  {
    body: "الديدان الطائرة",
    url: "https://i.pinimg.com/564x/c7/11/5c/c7115c358391d748443d34cd9629a006.jpg"
  },
  {
    body: "نحلة الحجر",
    url: "https://i.postimg.cc/zGGZ76q4/unnamed.jpg"
  },
  {
    body: "البرغوث العظيم",
    url: "https://static.timesofisrael.com/www/uploads/2018/09/Female_human_head_louse.jpg"
  },
  {
    body: "الجراد الشرير",
    url: "https://i.postimg.cc/CLKmQgfC/elegant-grasshopper.png"
  },
  {
    body: "العنكبوت الجامح",
    url: "https://inaturalist-open-data.s3.amazonaws.com/photos/2770565/large.jpg"
  },
  {
    body: "فراشات الضوء",
    url: "https://i.pinimg.com/564x/b9/5f/56/b95f568df290b0d2e9d0a8c188cf309a.jpg"
  },
  {
    body: "الدبور الراعي",
    url: "https://www.nhm.ac.uk/content/dam/nhmwww/discover/wasps/wasps-vespula-germanica-full-width.jpg.thumb.1160.1160.jpg"
  },
  {
    body: "الحريش العملاق",
    url: "https://nass-times.com/user_images/news/29-11-20-17836269.jpg"
  },
  {
    body: "حبيب الملايين بريص الشارع",
    url: "https://modo3.com/thumbs/fit630x300/54706/1437917519/%D8%A8%D8%AD%D8%AB_%D8%B9%D9%86_%D8%AD%D9%8A%D9%88%D8%A7%D9%86_%D8%A7%D9%84%D8%A8%D8%B1%D8%B5.jpg"
  }
];




async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  
 const {  messageReply, mentions, senderID } = message;
    const { Users } = global.controllers;
    const targetID = Object.keys(mentions)[0] || messageReply?.senderID || senderID;
    const userInfo = await Users.getInfo(targetID);
    const userName25 = userInfo?.name;
    let type = args.join(" ");

  
    if (type === "شخصية انمي") {
      
      function getRandomImageLink() {
  return selected[Math.floor(Math.random() * selected.length)];
}

  try {
    const imgLink = getRandomImageLink();
    const imgStream = await global.getStream(imgLink.url);

    const bodyImage = imgLink.body;
      
     

      message.reply({
      body: `${userName25} لو كنت شخصية انمي لكنت ${bodyImage} 👀`,
      attachment: imgStream
    });
  } catch {
    message.reply("حدث خطأ ما...");
  }

      
    } else if (type === "شخصية كرتون") {
      
      function getRandomImageLink() {
  return selectedCarton[Math.floor(Math.random() * selectedCarton.length)];
}


  try {
   
    const imgLink = getRandomImageLink();
    const imgStream = await global.getStream(imgLink.url);

    const bodyImage = imgLink.body;
      
       

      message.reply({
      body: `${userName25} لو كنت شخصية كرتون لكنت ${bodyImage} 👀`,
      attachment: imgStream
    });
  } catch {
    message.reply("حدث خطأ ما...");
  }
      
    } else if (type === "حمار") {
      
      function getRandomImageLink() {
  return selectedMonky[Math.floor(Math.random() * selectedMonky.length)];
}


  try {
   
    const imgLink = getRandomImageLink();
    const imgStream = await global.getStream(imgLink.url);

    const bodyImage = imgLink.body;
      
       

      message.reply({
      body: `${userName25} ${bodyImage} 👀`,
      attachment: imgStream
    });
  } catch {
    message.reply("حدث خطأ ما...");
  }
      
    } else if (type === "شخصية فلم") {
      
      function getRandomImageLink() {
       return selectedMoive[Math.floor(Math.random() * selectedMoive.length)];
}


  try {
   
      const imgLink = getRandomImageLink();
      const imgStream = await global.getStream(imgLink.url);

      const bodyImage = imgLink.body;
      
       

      message.reply({
      body: `${userName25} لو كنت شخصية فلم لكنت ${bodyImage} 👀`,
      attachment: imgStream
    });
  } catch {
    message.reply("حدث خطأ ما...");
  }
      
    } else if (type === "حشرة") {
      
      function getRandomImageLink() {
       return selectedAnti[Math.floor(Math.random() * selectedAnti.length)];
}


  try {
   
      const imgLink = getRandomImageLink();
      const imgStream = await global.getStream(imgLink.url);

      const bodyImage = imgLink.body;
      
       

      message.reply({
      body: `${userName25} لو كنت حشرة لكنت من فصيلة ${bodyImage} 👀`,
      attachment: imgStream
    });
  } catch {
    message.reply("حدث خطأ ما...");
  }
      
    }
    else {
        return message.reply("اختر نوع الامر الذي تفضل:\n لوكنت شخصية انمي\n لوكنت شخصية كرتون\nلوكنت شخصية فلم\nلوكنت حشرة\n لوكنت حمار");
    }
}


export default {
    config,
    onCall
}
