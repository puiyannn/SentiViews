import caudalie from './Assets/images/caudalie.jpg';

export const categories = [
    {
      index: 0,
      cat: 'Lipstick',
      // img: "https://www.chicmoey.com/wp-content/uploads/2020/09/2-10.jpg",
      img: 'https://cdn.wallpapersafari.com/35/13/cxt1SV.jpg',
      // img:"https://img1.goodfon.com/wallpaper/nbig/0/9e/gubnaya-pomada-kaplya.jpg",
      title: "LIPSTICK",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: false,
      },
      f1_name: "Long Lasting",
      f1_words: ['last long','long-lasting','long lasting','last','lasts','lasting','lasted','staying power','longevity','stay','stays','stays on','stay on','staying','stayed on','stays put'],
      f2_name: "Moisturizing",
      f2_words: ['moist','moisturize','moisturizing','moisturize','moisturized','moisturising','hydrating','cracked','chapped','peel','crack','overly drying','dries','dried','dry out'],
      f3_name: "Smudge-Proof",
      f3_words:['smudge proof', 'smudge','come off', 'smear', 'rub off'],
      f4_name: "Waterproof",
      f4_words: ['waterproof'], 
      f5_name:"",
      f5_words:[],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: false,
    },
    {
      index: 1,
      cat: 'Foundation',
      img: "https://i.pinimg.com/originals/68/c9/b2/68c9b2b99b5021d6fda635450b11831b.jpg",
      title: "FOUNDATION",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: true,
      },
      f1_name: "Long Lasting",
      f1_words:['long lasting','longlasting','staying power','longwearing','long-lasting', 'lasting','longwear','longevity','lasting power','lasts','lasted','last','stay','stays','budge','transfer','transfer proof','rub off'],
      f2_name: "Moisturizing",
      f2_words:['moisturizing','moisturising','moisturizes','moisturises','moisturize ','moisturise ','moisture','hydrate','hydrates','hydrated','hydrating','moisturized','nourishing','dries out','dried out','dry out'],
      f3_name: "Luminous",
      f3_words:['sheen','dewy','glowy','healthy glow','luminous','radiant','glowing','airbrushed','skin-like','dewey'],
      f4_name: "Lightweight",
      f4_words:['light weight','lightweight','light-weight','comfortable','weightless','breathable','sheer',' thin ',' thin.',' thin,','thick'],
      f5_name: "Buildable",
      f5_words:['buildable','build able','build-able'],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: true,
    },
    {
      index: 2,
      cat: 'Concealer',
      // img: 'https://www.makeupforever.com/dw/image/v2/BCRL_PRD/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/en_US/dw47748c18/PDP/ourpros/mvs-concealer_ourpros.png?q=85&strip=false',
      // img:'https://image.harrods.com/16/73/18/71/16731871_32822770_2048.jpg',
      img:'https://mochaminimalist.com/wp-content/uploads/2020/01/iliaconcealer-1.jpg',
      title: "CONCEALER",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: true,
      },
      f1_name: "Non-Cakey",
      f1_words:['lightweight','light weight','non_cakey','non-cakey','cakey','caky','caked','cake up','cake','feel heavy','crease','clumpy'],
      f2_name: "Blendability",
      f2_words:['blendability','blendable','blend well','blends well','blended well'],
      f3_name: "Full Coverage",
      f3_words:['full coverage'],
      f4_name: "Buildable Coverage",
      f4_words:['buildable','buildable coverage','build able'],
      f5_name: "Long Lasting",
      f5_words:['long lasting','longlasting','stay','stays','stayed','last','lasts','lasted','stay put','stays put','stayed put'],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: true,
    },

    {
      index: 3,
      cat: 'Eyeliner',
      // img: "https://img.joomcdn.net/bb7ed65b341b79df3fd1de91157addfe0cbd0a60_original.jpeg",
      img: "https://i.ebayimg.com/images/g/h5wAAOSw53NY~25D/s-l1600.jpg",
      title: "EYELINER",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: true,
      },
      f1_name: "Waterproof",
      f1_words:['waterproof','water proof','water resistant','waterresistant','water-resistant','water_resistance'],
      f2_name: "Smudge-Proof",
      f2_words:['smudge-proof','smudgeproof','smudge proof','smudge','smudges','smears','smear','budge'],
      f3_name: "Smooth",
      f3_words:['smooth','glides on','glide on','glide smoothly','glides smoothly','smoothly','apply smoothly','applies smoothly','glide easily','glides easily','silky smooth','like butter'],
      f4_name: "Sharp",
      f4_words:['sharp','pointy','precise','fine line'],
      f5_name: "Long Lasting",
      f5_words:['long-lasting','longwearing','long lasting','long-wearing','staying power','stay','stays','stayed','stay_put','stays put','stayed put'],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: true,
    },
    {
      index: 4,
      cat: 'Eyebrows',
      // img:'https://m.bobbibrowncosmetics.com/media/export/cms/products/v2_1080x1080/bb_prod_79625_1080x1080_3.jpg',
      img:'https://s3.ap-southeast-1.amazonaws.com/assets.femaledaily.com/images/post/17f33b1230afb12b66b5cd5586a83249.jpg',
      title: "EYEBROWS",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: true,
      },
      f1_name: "Blendable",
      f1_words:['blendable','blend','blends','blending','blended'],
      f2_name: "Long Lasting",
      f2_words:['long lasting','longlasting','long wearing','longwearing'],
      f3_name: "Precise",
      f3_words:['precise','precision','detailed','slim','sharp'],
      f4_name: "Waterproof",
      f4_words:['waterproof','water proof','water resistant','sweat proof','sweatproof'],
      f5_name: "Smudge Proof",
      f5_words:['smudge proof','budge proof','stays put','smudge','smear','rub off',"doesn't budge"],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: true,
    },
    {
      index: 5,
      cat: 'Mascara',
      // img: "https://media.istockphoto.com/photos/mascara-picture-id155580360?k=20&m=155580360&s=612x612&w=0&h=8F0BCJBJEHGQWu-hEkKNyUM8GIHwS74Z0mkgduSR9Xc=",
      img:'https://assets.isabellagarcia.co.za/uploads/2022/03/5th-Wonder-Mascara-Stylised-black-Background.jpg',
      title: "MASCARA",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: true,
      },
      f1_name: "Waterproof",
      f1_words:['waterproof','water proof','water resistant','sweat proof','sweatproof'],
      f2_name: "Voluminous",
      f2_words:['voluminous','fluffy','lifted','full','thick','volumized','bold','fuller','fluffy','volumizing','thickening','volumising','defining','volumize','thicken','lift'],
      f3_name: "Non-Clumpy",
      f3_words:['non-clumpy','non clumpy','non clumping','clumpy','chunky','lumpy','flaky','goopy','clump','clumping','clumps','flake','flakes','flaked','clog','clogs','clogged','lumps','lumps','clumpiness','flaking'],
      f4_name: "Lengthening",
      f4_words:['lengthening','length','lengthing','lengthen','lengthens','lengthened','elongate','elongates','elongated','lift','lifted','lifts','extend','extends'],
      f5_name: "Smudge Proof",
      f5_words:['smudge','smudges','smudged','budge','smear','smears','smeared','rub off','rubs off','smudge proof','smudgeproof','smudge-proof'],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: true,
    },   
    {
      index: 6,
      cat: 'Primer',
      // img:'https://img.freepik.com/free-vector/elegant-cosmetic-face-crem-jar-skin-care-black-background-beautiful-cosmetic-template-ads-makeup-products-brand-realistic-3d-black-matte-cosmetic-jar_195742-203.jpg',
      // img:"https://i.pinimg.com/564x/bc/6d/29/bc6d29cc6e97bee71f644d8db9deb88a.jpg",
      img: 'https://static.thcdn.com/images/medium/original/widgets/134-en/58/0524-15364-MC-IL-Mini-Black-Friday-Assets-Primer-1-672x448-122858.jpg',
      title: "PRIMER",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: false,
        f5: false,
      },
      f1_name: "Hydrating",
      f1_words:['hydrating','hydrate','hydrates','hydrated','moisturize ','moisturizing ','moisturizes ','moisturized ','moisturising'],
      f2_name: "Blurring Effect",
      f2_words:['blurring effect','smoothing effect','blurring','blur','blurs','hide','hides','minimize','minimizes','minimized','minimise',
      'conceal','conceals','diminish','diminishing','diminished','diminishes','fill','fills','filling','invisible',],
      f3_name: "Dewy Complexion",
      f3_words:['dewy','glowy','luminous','radiant','dewey','glowing','brighten ','brightens','brightened','dull'],
      f4_name: "",
      f4_words:[],
      f5_name: "",
      f5_words:[],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: false,
      f5_exists: false,
    },
    {
      index: 7,
      cat: 'Facial Cleanser',
      img:'https://images.ulta.com/is/image/Ulta/2290943_prod_altimg_1?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg',
      title: "CLEANSER",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: true,
        f5: true,
      },
      f1_name: "Gentle",
      f1_words: ['gentle','mild','soothing','irritate','irritates','irritated','cause breakouts'],
      f2_name: "Moisturizing",
      f2_words:['moisturizing','moisturize','moisturizes','moisturized','moisturising','hydrate','hydrates','hydrating','hydrated','nourish','nourishes','nourished','nourishing','dry out','dries out','dried out'],
      f3_name: "Fragrance Free",
      f3_words:['fragrance free','fragrancefree','no fragrance','unscented','scented'],
      f4_name: "Oil Control",
      // f4_words:['oil control','no oily','less oily','not oily','so oily','very oily','more oily'],
      f4_words:['oil control','oily'],
      f5_name: "Non-Foaming",
      f5_words:['non foaming','not foaming','not foam','not foamy'],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: true,
      f5_exists: true,
    },
    {
      index: 8,
      cat: 'Scrub',
      img:'https://media.istockphoto.com/photos/black-sand-dune-black-sand-beach-macro-photography-background-texture-picture-id1314229916?b=1&k=20&m=1314229916&s=170667a&w=0&h=rEnib5wKaUR7M3J_9uHHV2PKR2E1E-ODAEe4Oj8pG_I=',
      title: "FACIAL SCRUB",
      features:{
        f1: true,
        f2: true,
        f3: true,
        f4: false,
        f5: false,
      },
      f1_name: "Exfoliating Power",
      f1_words:['exfoliation','exfoliating','exfoliating power','scrubbing power','exfoliating effect'],
      f2_name: "Gentle",
      f2_words:['gentle','gentle enough','abrasive','harsh','burn','irritate','burn'],
      f3_name: "For Sensitive Skin",
      f3_words:['sensitive skin'],
      f4_name: "",
      f4_words:[],
      f5_name: "",
      f5_words:[],
      f1_exists: true,
      f2_exists: true,
      f3_exists: true,
      f4_exists: false,
      f5_exists: false,
    }



  ];


export const sliderItems = [
  {
    id: 1,
    // img: "https://wx2.sinaimg.cn/mw2000/006SzZJNly1gyrm4zcmm5j356o3gghe0.jpg",
    // img: "https://www.makeupforever.com/on/demandware.static/-/Sites-MakeUpForEver-KR-Library/default/dw6e6aa24a/SLIDER/UHD-SETTING-POWDER-OMS-HERO-BANNER-2.jpg",
    // title: "SUMMER SALE",
    // desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "d9d9d9",
  },
  {
    id: 2,
    // img: `url(${caudalie})`,
    // title: "AUTUMN COLLECTION",
    // desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "eef0ed",
  },
  {
    id: 3,
    img: "https://i.ibb.co/cXFnLLV/3.png",
    // title: "LOUNGEWEAR LOVE",
    // desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "171810",
  },
];