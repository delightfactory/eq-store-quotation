export const quotationMeta = {
  version: "1.0",
  issueDate: "2026-04-29",
  computedExpiryDate: "2026-05-04", // 3 business days from 29th (assuming 29 is Wed, 30 Thu, 1-2 Fri/Sat, 3 Sun, 4 Mon)
  validityText: "3 أيام عمل من تاريخ الإصدار",
  deliveryScope: "تسليم مصنع ديلايت",
  deliveryType: "منتجات سائلة Bulk",
  includesVAT: false,
  includesPackaging: false,
};

export const issuer = {
  name: "DELIGHT CAR CARE PROUDCTS & MORE",
  nameEn: "Delight Factory for Car Care Products"
};

export const client = {
  name: "شركة EQ Store",
  nameEn: "EQ Store"
};

export const digitalExperience = {
  by: "Tech Edge"
};

export const categories = {
  interior: { id: 'interior', labelAr: "العناية الداخلية", color: "#C9A961" },
  tires: { id: 'tires', labelAr: "الإطارات والفيبر الأسود", color: "#8A8B8E" },
  premium: { id: 'premium', labelAr: "Premium / الجرافيت", color: "#6B8E6F" },
  exterior: { id: 'exterior', labelAr: "الغسيل والعناية الخارجية وPPF", color: "#4A8B96" },
  fabric: { id: 'fabric', labelAr: "الفرش والأقمشة", color: "#9C5141" },
  engine: { id: 'engine', labelAr: "الموتور", color: "#C9924A" }
};

export type Product = {
  id: string;
  order: number;
  nameEn: string;
  nameAr: string;
  categoryId: string;
  role: 'hero' | 'premium' | 'support' | 'specialized' | 'consumable';
  roleLabelAr: string;
  quantityKg: number;
  pricePerKg: number;
  totalValue: number;
  strategicRole: string;
  keyStrengths: string[];
  inclusionReason: string;
  shortMessage: string;
  rawMaterialReview: {
    date: string;
    note: string;
    trend?: 'up' | 'stable' | 'down';
    trendPercent?: number;
  };
  currentReviewedPrice: number | null; // Always null in v1.0
  reviewedAt: string | null;
  reviewNote: string | null;
  productionStatus: 'pending' | 'in_progress' | 'completed';
};

export const products: Product[] = [
  {
    id: 'super-nova',
    order: 1,
    nameEn: 'Super Nova',
    nameAr: 'سوبر نوفا',
    categoryId: 'interior',
    role: 'hero',
    roleLabelAr: 'المنتج الأساسي',
    quantityKg: 375,
    pricePerKg: 165,
    totalValue: 61875,
    strategicRole: 'Super Nova هو المنتج الأساسي في خط العناية الداخلية، لأنه يخاطب واحدة من أكثر المناطق وضوحًا وتأثيرًا داخل السيارة: التابلوه، الجلد، البلاستيك الداخلي، الأبواب، والكونسول. وجوده في الدفعة الأولى ضروري لأنه المنتج الذي يمكن أن يبني ثقة العميل في خط العناية الداخلية من أول تجربة.',
    keyStrengths: [
      'منتج رئيسي سريع الدوران في فئة العناية الداخلية.',
      'مناسب للعميل النهائي والمراكز.',
      'يمنح مظهرًا غنيًا ولمعة متوازنة.',
      'يساعد على تحسين مظهر التابلوه والجلود والبلاستيك الداخلي.',
      'يصلح كمنتج بطل في حملات تسويق العناية الداخلية.',
      'يعطي إحساسًا Premium داخل المقصورة.'
    ],
    inclusionReason: 'تم تخصيص 375 كجم لأنه المنتج الأساسي للتابلوه والعناية الداخلية، مع ترك مساحة مهمة داخل نفس التصنيف لـ Express Touch باعتباره منتج مراكز قابل للتخفيف.',
    shortMessage: 'المنتج الأساسي للعناية الداخلية؛ مظهر أغنى، لمعة متوازنة، وحضور أقوى داخل المقصورة.',
    rawMaterialReview: {
      date: '2026-04-27',
      note: 'تم رصد زيادة مؤثرة في بعض مدخلات التركيبة بنسبة تقريبية 8%',
      trend: 'up',
      trendPercent: 8
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'express-touch',
    order: 2,
    nameEn: 'Express Touch',
    nameAr: 'إكسبريس تاتش',
    categoryId: 'interior',
    role: 'specialized',
    roleLabelAr: 'منتج مراكز قابل للتخفيف',
    quantityKg: 250,
    pricePerKg: 210,
    totalValue: 52500,
    strategicRole: 'Express Touch عنصر مهم جدًا في العرض لأن EQ Store تستهدف المراكز والمغاسل. المنتج قابل للتخفيف بالماء، وبالتالي يخدم التشغيل اليومي وتكلفة الاستخدام داخل المراكز بشكل واضح. المنتج لا يتم تقديمه كبديل مباشر لـ Super Nova، بل كمنتج Professional داعم.',
    keyStrengths: [
      'قابل للتخفيف بالماء.',
      'مناسب للمراكز والمغاسل.',
      'يدعم البيع B2B والاستهلاك المتكرر.',
      'يساعد على تقليل تكلفة الاستخدام لكل سيارة.',
      'يكمل Super Nova ولا ينافسه مباشرة.',
      'يمنح خط العناية الداخلية بعدًا تشغيليًا مهمًا.'
    ],
    inclusionReason: 'تم تخصيص 250 كجم لأنه منتج استراتيجي لقطاع المراكز والمغاسل، مع الحفاظ على توازن الميزانية لصالح المنتجات الأساسية الأخرى والجرافيت.',
    shortMessage: 'حل احترافي قابل للتخفيف للمراكز والمغاسل، يوازن بين الأداء وتكلفة التشغيل.',
    rawMaterialReview: {
      date: '2026-04-08',
      note: 'تمت مراجعة التكلفة طبقًا لآخر أسعار الخامات المتاحة'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'ultra-shine',
    order: 3,
    nameEn: 'Ultra Shine',
    nameAr: 'ألترا شاين',
    categoryId: 'tires',
    role: 'hero',
    roleLabelAr: 'منتج سريع الدوران',
    quantityKg: 500,
    pricePerKg: 187,
    totalValue: 93500,
    strategicRole: 'Ultra Shine هو المنتج الرئيسي لفئة الإطارات، وواحد من أسرع المنتجات في البيع لأنه يقدم نتيجة بصرية فورية. الإطار الأسود اللامع يغيّر شكل السيارة بعد الغسيل مباشرة، ويمنح العميل إحساسًا واضحًا بأن المنتج أعطى نتيجة ملموسة.',
    keyStrengths: [
      'لون أسود عميق ولمعة واضحة.',
      'نتيجة سريعة وسهلة الملاحظة.',
      'مناسب للعميل النهائي والمراكز.',
      'قوي في صور ومحتوى قبل/بعد.',
      'منتج أساسي في أي خط عناية سيارات.',
      'يساعد على تكرار الشراء بسبب وضوح النتيجة.'
    ],
    inclusionReason: 'تم رفع الكمية إلى 500 كجم لأنه من المنتجات التي تساعد البراند على تحقيق ظهور سريع في السوق، ولأن فئة الإطارات من أكثر الفئات سهولة في البيع والإقناع.',
    shortMessage: 'ملمع إطارات سريع التأثير يمنح اللون الأسود عمقًا ولمعة واضحة بعد كل غسيل.',
    rawMaterialReview: {
      date: '2026-04-22',
      note: 'تمت مراجعة تكلفة الخامات طبقًا لآخر أسعار توريد متاحة'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'black-recharge',
    order: 4,
    nameEn: 'Black Recharge',
    nameAr: 'بلاك ريتشارج',
    categoryId: 'tires',
    role: 'specialized',
    roleLabelAr: 'منتج متخصص',
    quantityKg: 125,
    pricePerKg: 145,
    totalValue: 18125,
    strategicRole: 'Black Recharge منتج متخصص لتجديد اللون الأسود في الفيبر والبلاستيك الخارجي. دوره مختلف عن Ultra Shine؛ فهو لا يركز فقط على اللمعة السريعة، بل يعالج مظهر البهتان والتكليح واستعادة عمق اللون الأسود.',
    keyStrengths: [
      'يعالج بهتان الفيبر والبلاستيك الأسود.',
      'يعطي عمقًا أوضح للون الأسود.',
      'يضيف للخط منتجًا متخصصًا وليس مجرد ملمع.',
      'مناسب للمراكز كبند خدمة إضافي.',
      'يرفع قيمة خط الإطارات والفيبر الأسود.'
    ],
    inclusionReason: 'تم إدخاله بكمية 125 كجم لأنه منتج متخصص وليس سريع الدوران مثل Ultra Shine. وجوده مهم لتكملة الخط، لكن تم ضبط كميته حتى لا يسحب من ميزانية المنتجات الأعلى أولوية.',
    shortMessage: 'مجدد لون أسود متخصص يعالج بهتان الفيبر والبلاستيك الخارجي ويعيد عمق اللون.',
    rawMaterialReview: {
      date: '2026-04-07',
      note: 'تمت مراجعة تكلفة خامات العناية بالأسطح السوداء'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'shampoo-wax',
    order: 5,
    nameEn: 'Shampoo Wax',
    nameAr: 'شامبو واكس',
    categoryId: 'exterior',
    role: 'consumable',
    roleLabelAr: 'منتج استهلاكي متكرر',
    quantityKg: 1000,
    pricePerKg: 44,
    totalValue: 44000,
    strategicRole: 'Shampoo Wax هو منتج استهلاكي متكرر، يخدم العميل النهائي والمغاسل في نفس الوقت. وجوده مهم لأنه يعطي الخط منتجًا يوميًا واضحًا وسهل البيع، وسعره يسمح بإنتاج كمية كبيرة دون الضغط على الميزانية.',
    keyStrengths: [
      'منتج يومي ومتكرر الطلب.',
      'مناسب للمغاسل والمراكز.',
      'يجمع بين التنظيف ولمسة اللمعان.',
      'سعره يسمح بإنتاج كمية كبيرة.',
      'يساعد على انتشار البراند بسبب تكرار الاستخدام.',
      'منتج أساسي في أي خط عناية سيارات.'
    ],
    inclusionReason: 'تم اختيار كمية 1,000 كجم لأنه المنتج الأعلى استهلاكًا داخل العرض، ويخدم البيع المباشر والتشغيل الاحترافي في نفس الوقت.',
    shortMessage: 'شامبو غسيل يومي بلمسة واكس؛ منتج استهلاكي متكرر يدعم الانتشار والتشغيل.',
    rawMaterialReview: {
      date: '2026-03-28',
      note: 'تمت مراجعة تكلفة خامات الشامبو والمواد الخافضة للتوتر السطحي'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'graphite',
    order: 6,
    nameEn: 'Graphite',
    nameAr: 'جرافيت',
    categoryId: 'premium',
    role: 'premium',
    roleLabelAr: 'منتج Premium',
    quantityKg: 50,
    pricePerKg: 1900,
    totalValue: 95000,
    strategicRole: 'Graphite هو المنتج الأعلى قيمة داخل العرض، ودوره لا يقتصر على البيع فقط، بل يمتد إلى رفع صورة البراند بالكامل. وجوده يعطي خط EQ Store إحساسًا Premium واضحًا، ويمنح الشركة منتجًا يمكن تقديمه ضمن باقات أعلى قيمة للمراكز والعملاء المميزين.',
    keyStrengths: [
      'منتج عالي القيمة.',
      'مناسب للباقات الفاخرة.',
      'يرفع صورة البراند.',
      'يدعم التمركز الاحترافي أمام العملاء والمراكز.',
      'يعطي تميزًا واضحًا عن خطوط المنتجات التقليدية.',
      'يصلح كمنتج Hero داخل العروض التسويقية.'
    ],
    inclusionReason: 'تم اعتماد 50 كجم كحد أدنى استراتيجي؛ لأن الجرافيت منتج Premium لا يُدار بمنطق الكمية الكبيرة، بل بمنطق القيمة والصورة والتمركز.',
    shortMessage: 'منتج Premium عالي القيمة يرفع صورة الخط ويمنح البراند تميزًا واضحًا.',
    rawMaterialReview: {
      date: '2026-04-17',
      note: 'تمت مراجعة تكلفة الخامات الخاصة بالمواد عالية القيمة'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'shine-shield',
    order: 7,
    nameEn: 'Shine Shield',
    nameAr: 'شاين شيلد',
    categoryId: 'exterior',
    role: 'support',
    roleLabelAr: 'تشطيب خارجي',
    quantityKg: 250,
    pricePerKg: 177,
    totalValue: 44250,
    strategicRole: 'Shine Shield منتج مهم للتشطيب السريع والعناية الخارجية، مناسب للمعارض والمراكز والعملاء الذين يريدون لمعة فورية ومظهرًا مرتبًا بدون خطوات معقدة.',
    keyStrengths: [
      'يعطي لمعة سريعة ومظهرًا مرتبًا.',
      'مناسب للمراكز والمعارض.',
      'يدعم خط العناية الخارجية.',
      'منتج Detail سريع التأثير.',
      'يضيف قيمة أعلى من الشامبو التقليدي.',
      'يساعد في تقديم خدمة تشطيب خارجية أكثر احترافية.'
    ],
    inclusionReason: 'تم تخصيص 250 كجم لأنه منتج مهم داخل العناية الخارجية، لكنه أقل استهلاكًا من Shampoo Wax، لذلك يأخذ كمية متوسطة ومتوازنة.',
    shortMessage: 'منتج تشطيب خارجي سريع يمنح لمعة فورية ويدعم خدمات المراكز والمعارض.',
    rawMaterialReview: {
      date: '2026-04-06',
      note: 'تمت مراجعة تكلفة خامات العناية الخارجية والواكس السريع'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'ultra-max-green',
    order: 8,
    nameEn: 'Ultra Max Green',
    nameAr: 'ألترا ماكس جرين',
    categoryId: 'fabric',
    role: 'support',
    roleLabelAr: 'منظف فرش أساسي',
    quantityKg: 250,
    pricePerKg: 125,
    totalValue: 31250,
    strategicRole: 'Ultra Max Green يمثل خط تنظيف الفرش والأقمشة، وهو منتج مهم لاستكمال البورتفوليو وعدم حصره في التلميع فقط. وجوده يعطي الخط قدرة على خدمة باقات تنظيف داخلية أوسع داخل المراكز.',
    keyStrengths: [
      'منظف فرش وأقمشة احترافي.',
      'مناسب للمراكز والمغاسل.',
      'يخدم باقات تنظيف المقصورة.',
      'يضيف للخط جانب التنظيف الحقيقي.',
      'مطلوب في خدمات العناية الداخلية.',
      'يوازن بين منتجات التلميع ومنتجات التنظيف.'
    ],
    inclusionReason: 'تم تخصيص 250 كجم لإعطاء خط الفرش حضورًا واضحًا دون أن يزاحم منتجات التابلوه والإطارات والجرافيت.',
    shortMessage: 'منظف فرش وأقمشة يدعم باقات تنظيف المقصورة ويكمل خط العناية الداخلية.',
    rawMaterialReview: {
      date: '2026-04-03',
      note: 'تمت مراجعة تكلفة خامات تنظيف الفرش والأقمشة'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'pistol-700',
    order: 9,
    nameEn: 'Pistol 700',
    nameAr: 'بيستول 700',
    categoryId: 'engine',
    role: 'support',
    roleLabelAr: 'منظف دهون وموتور',
    quantityKg: 250,
    pricePerKg: 55,
    totalValue: 13750,
    strategicRole: 'Pistol 700 هو منتج تنظيف وإزالة دهون، ووجوده مهم لأنه يعطي الخط بعدًا فنيًا ويخدم منطقة مختلفة عن التلميع والعناية الشكلية. المنتج مناسب للمراكز والمغاسل التي تحتاج منتجًا عمليًا للتعامل مع الدهون والزيوت والرواسب.',
    keyStrengths: [
      'مناسب لإزالة الدهون والزيوت.',
      'يخدم خط الموتور والتنظيف الفني.',
      'سعره يسمح بإدخاله بكمية جيدة.',
      'منتج عملي ومفهوم للمراكز.',
      'يدعم تقديم باقات تنظيف موتور.',
      'يعطي البورتفوليو مصداقية فنية أكبر.'
    ],
    inclusionReason: 'تم رفعه إلى 250 كجم لأن سعره منخفض نسبيًا، ووجود كمية تشغيل جيدة منه يدعم خط الموتور بدون ضغط كبير على الميزانية.',
    shortMessage: 'منظف دهون عملي يدعم خط الموتور ويضيف بعدًا فنيًا للبورتفوليو.',
    rawMaterialReview: {
      date: '2026-04-02',
      note: 'تمت مراجعة تكلفة خامات التنظيف وإزالة الدهون'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'engine-guard',
    order: 10,
    nameEn: 'Engine Guard',
    nameAr: 'إنجين جارد',
    categoryId: 'engine',
    role: 'specialized',
    roleLabelAr: 'منتج موتور قابل للتخفيف',
    quantityKg: 125,
    pricePerKg: 215,
    totalValue: 26875,
    strategicRole: 'Engine Guard منتج موتور قابل للتخفيف بالماء، موجه للمراكز التي تحتاج منتجًا احترافيًا للاستخدام ضمن باقات العناية بالموتور. وجوده بجانب Pistol 700 يجعل خط الموتور أكثر اكتمالًا.',
    keyStrengths: [
      'قابل للتخفيف بالماء.',
      'مناسب للمراكز.',
      'يكمل Pistol 700 داخل خط الموتور.',
      'يدعم تقديم خدمة موتور أكثر اكتمالًا.',
      'يرفع قيمة خط العناية بالموتور.',
      'مناسب كبند تشغيلي احترافي في المراكز.'
    ],
    inclusionReason: 'تم تخصيص 125 كجم كبداية مدروسة، لأن المنتج مهم لكنه ليس أعلى أولوية من التابلوه، الإطارات، الجرافيت، أو الشامبو.',
    shortMessage: 'منتج موتور قابل للتخفيف يدعم المراكز ويكمل منظومة العناية بالموتور.',
    rawMaterialReview: {
      date: '2026-04-05',
      note: 'تمت مراجعة تكلفة الخامات القابلة للتخفيف الخاصة بخط الموتور'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  },
  {
    id: 'ppf-gel',
    order: 11,
    nameEn: 'PPF Gel',
    nameAr: 'بي بي إف جل',
    categoryId: 'exterior',
    role: 'specialized',
    roleLabelAr: 'منتج لتركيب أفلام الحماية',
    quantityKg: 500,
    pricePerKg: 44,
    totalValue: 22000,
    strategicRole: 'PPF Gel يضيف للعرض منتجًا متخصصًا يخدم مراكز تركيب أفلام الحماية. وجوده يعطي EQ Store فرصة للتواجد داخل قطاع مهم من قطاعات المراكز والديتيلينج.',
    keyStrengths: [
      'منتج متخصص لمجال PPF.',
      'مناسب للمراكز.',
      'سعره يسمح بإنتاج كمية جيدة.',
      'يضيف خطًا مهنيًا جديدًا للبورتفوليو.',
      'يعزز صورة EQ Store كمورد منتجات تشغيل للمراكز.',
      'يخدم قطاعًا مختلفًا عن التلميع والغسيل التقليدي.'
    ],
    inclusionReason: 'تم تخصيص 500 كجم لأن المنتج منخفض التكلفة نسبيًا، ويساعد في دعم حضور الشركة داخل مراكز PPF والتفصيل الاحترافي.',
    shortMessage: 'جل متخصص لتركيب أفلام الحماية، يدعم حضور البراند داخل مراكز PPF والديتيلينج.',
    rawMaterialReview: {
      date: '2026-03-31',
      note: 'تمت مراجعة تكلفة خامات الجل والمواد المساعدة على التركيب'
    },
    currentReviewedPrice: null,
    reviewedAt: null,
    reviewNote: null,
    productionStatus: 'pending'
  }
];

export const productionStages = [
  { id: 'approval', labelAr: "اعتماد العرض", status: 'pending' },
  { id: 'samples', labelAr: "اعتماد العينات", status: 'pending' },
  { id: 'packaging', labelAr: "اعتماد العبوات والليبلات", status: 'pending' },
  { id: 'materials', labelAr: "مراجعة توافر الخامات", status: 'pending' },
  { id: 'production', labelAr: "بدء الإنتاج", status: 'pending' },
  { id: 'qc', labelAr: "مراقبة الجودة", status: 'pending' },
  { id: 'preparation', labelAr: "التجهيز للتسليم", status: 'pending' },
  { id: 'delivery', labelAr: "التسليم", status: 'pending' }
];

export const commercialTerms = [
  { id: 'scope', title: "نطاق العرض", text: "الأسعار الواردة في هذا العرض تخص المنتجات السائلة Bulk فقط، تسليم مصنع ديلايت.", priority: true },
  { id: 'vat', title: "ضريبة القيمة المضافة", text: "الأسعار غير شاملة ضريبة القيمة المضافة.", priority: true },
  { id: 'packaging', title: "التعبئة والتغليف", text: "الأسعار غير شاملة العبوات، الأغطية، البخاخات، الليبلات، الطباعة، الكراتين، التغليف، أو أي مستلزمات تعبئة خارجية.", priority: true },
  { id: 'validity', title: "صلاحية العرض", text: "صلاحية هذا العرض 3 أيام عمل من تاريخ الإصدار.", priority: true },
  { id: 'price_review', title: "مراجعة الأسعار", text: "الأسعار قابلة للمراجعة في حالة حدوث تغير في أسعار الخامات، سعر الصرف، تكاليف النقل، أو ظروف التوريد في السوق المحلي.", priority: false },
  { id: 'execution', title: "بدء التنفيذ", text: "يبدأ تنفيذ أمر التشغيل بعد اعتماد العينات والمواصفات النهائية وتأكيد شروط الدفع المتفق عليها.", priority: false },
  { id: 'payment', title: "شروط الدفع", text: "يتم تحديد شروط الدفع والجدول الزمني للتنفيذ عند اعتماد أمر التشغيل النهائي.", priority: false },
  { id: 'quantities', title: "الكميات التشغيلية", text: "الكميات الواردة في العرض تم إعدادها وفقًا لوحدات تشغيل عملية قدر الإمكان، وقد يتم تعديلها عند التنفيذ بما يتوافق مع طبيعة الإنتاج والتشغيل.", priority: false },
  { id: 'ip', title: "الملكية التجارية", text: "لا يشمل هذا العرض أي حقوق ملكية تجارية أو تصميمات نهائية أو تسجيل علامات تجارية، ما لم يتم الاتفاق على ذلك كتابةً في عرض مستقل.", priority: false },
  { id: 'testing', title: "اختبار العبوات", text: "أي عبوات أو خامات تعبئة يتم توريدها من طرف العميل تخضع لاختبار توافق مبدئي مع المنتج قبل اعتماد التشغيل الكامل.", priority: false },
  { id: 'updates', title: "التحديثات الرقمية", text: "أي تحديثات سعرية تظهر في النسخة الرقمية بعد تاريخ إصدار العرض لا تُعد تعديلًا تلقائيًا للسعر الرسمي، إلا في حالة إصدار نسخة عرض جديدة أو اعتماد مراجعة مكتوبة بين الطرفين.", priority: false },
];

export const selectors = {
  totalQuotationValue: () => products.reduce((sum, p) => sum + p.totalValue, 0),
  totalQuantity: () => products.reduce((sum, p) => sum + p.quantityKg, 0),
  categoryAllocation: () => {
    const alloc = Object.keys(categories).map(catId => {
      const catProducts = products.filter(p => p.categoryId === catId);
      const value = catProducts.reduce((sum, p) => sum + p.totalValue, 0);
      return {
        categoryId: catId,
        labelAr: categories[catId as keyof typeof categories].labelAr,
        color: categories[catId as keyof typeof categories].color,
        value,
        percentage: 0 // Will be calculated next
      };
    }).filter(a => a.value > 0);

    const total = alloc.reduce((sum, a) => sum + a.value, 0);
    alloc.forEach(a => a.percentage = (a.value / total) * 100);
    return alloc.sort((a, b) => b.value - a.value);
  },
  topProductByValue: () => [...products].sort((a, b) => b.totalValue - a.totalValue)[0],
  topProductByQuantity: () => [...products].sort((a, b) => b.quantityKg - a.quantityKg)[0]
};
