export interface IslamicSource {
  id: string;
  theme: 'Tawakkul' | 'Sabr' | 'Dua' | 'Dhikr' | 'Raja\'' | 'Rida' | 'Akhirah Perspective' | 'Taking Means' | 'Shukr & Gratitude';
  category: 'QUR\'AN' | 'HADITH' | 'SCHOLAR STATEMENT';
  arabicText?: string;
  translation: string;
  reference: string;
  context: string;
  spiritualReflection: string;
}

export const VERIFIED_ISLAMIC_SOURCES: IslamicSource[] = [
  {
    id: 'quran-14-7',
    theme: 'Shukr & Gratitude',
    category: 'QUR\'AN',
    arabicText: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
    translation: 'And [remember] when your Lord proclaimed: "If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe."',
    reference: 'Surah Ibrahim [14:7]',
    context: 'When remembering that recognizing blessings is a gateway to tranquility and continued divine favor.',
    spiritualReflection: 'Gratitude is not mere complacency; it is actively attuning the heart to Allah’s continuous goodness, which preserves existing favors and invites more peace.'
  },
  {
    id: 'hadith-tirmidhi-2346',
    theme: 'Shukr & Gratitude',
    category: 'HADITH',
    arabicText: 'مَنْ أَصْبَحَ مِنْكُمْ آمِنًا فِي سِرْبِهِ، مُعَافًى فِي جَسَدِهِ، عِنْدَهُ قُوتُ يَوْمِهِ، فَكَأَنَّمَا حِيزَتْ لَهُ الدُّنْيَا',
    translation: 'Whoever among you wakes up secure in his dwelling, healthy in his body, having his food for the day, it is as if the whole world was gathered for him.',
    reference: 'Jami\' al-Tirmidhi, Hadith 2346 [Graded Hasan by Al-Albani]',
    context: 'Finding contentment in the primary, foundational blessings of today rather than obsessing over tomorrow’s unwritten worries.',
    spiritualReflection: 'Safety right now, life and strength in your body, and provision for today—these three essentials are the true kingdom of this dunya. Pausing to see them silences much of our anxiety.'
  },
  {
    id: 'hadith-muslim-2963',
    theme: 'Shukr & Gratitude',
    category: 'HADITH',
    arabicText: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ',
    translation: 'How wonderful is the affair of the believer! For his affair is all good, and this applies to no one except the believer: If prosperity arrives, he expresses gratitude and it is good for him; and if adversity befalls him, he shows patience and it is good for him.',
    reference: 'Sahih Muslim, Hadith 2963 [Grading: Sahih]',
    context: 'Teaching contentment and gratitude during ease, and patience during adversity.',
    spiritualReflection: 'The heart of a believer is never defeated: in moments of ease, it blooms in gratitude; in moments of difficulty, it gains nobility through patience.'
  },
  {
    id: 'quran-13-28',
    theme: 'Dhikr',
    category: 'QUR\'AN',
    arabicText: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
    reference: 'Surah Ar-Ra\'d [13:28]',
    context: 'Comforting the believers when thoughts and worldly anxieties cloud the mind.',
    spiritualReflection: 'When the thoughts in your head become noisy and crowded, returning to quiet remembrance of Allah restores stillness to the heart.'
  },
  {
    id: 'quran-65-3',
    theme: 'Tawakkul',
    category: 'QUR\'AN',
    arabicText: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
    translation: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    reference: 'Surah At-Talaq [65:3]',
    context: 'When fearing future provision, decisions, or unknown outcomes.',
    spiritualReflection: 'Your responsibility is to take whatever modest, lawful step is in front of you. Once you have done that, entrust the rest to Allah—He is enough for you.'
  },
  {
    id: 'quran-94-5-6',
    theme: 'Sabr',
    category: 'QUR\'AN',
    arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    reference: 'Surah Ash-Sharh [94:5-6]',
    context: 'During heavy moments when situations feel insurmountable or unending.',
    spiritualReflection: 'Ease does not merely arrive far after difficulty; ease is created alongside it. You do not have to carry tomorrow\'s burdens today.'
  },
  {
    id: 'quran-2-286',
    theme: 'Sabr',
    category: 'QUR\'AN',
    arabicText: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    translation: 'Allah does not charge a soul except [with that within] its capacity.',
    reference: 'Surah Al-Baqarah [2:286]',
    context: 'When feeling completely overwhelmed by life\'s responsibilities.',
    spiritualReflection: 'Allah knows your capacity better than you do. What you are facing right now is within what you are able to bear with His assistance.'
  },
  {
    id: 'quran-2-216',
    theme: 'Rida',
    category: 'QUR\'AN',
    arabicText: 'وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ ۗ وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ',
    translation: 'Perhaps you dislike a thing and it is good for you, and perhaps you love a thing and it is bad for you. And Allah knows, while you know not.',
    reference: 'Surah Al-Baqarah [2:216]',
    context: 'When grappling with unexpected disappointments or plans that did not work out.',
    spiritualReflection: 'You can only see the present chapter, but Allah sees the entire decree. Release the burden of needing everything to unfold according to your expectations.'
  },
  {
    id: 'hadith-muslim-2664',
    theme: 'Taking Means',
    category: 'HADITH',
    arabicText: 'احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلاَ تَعْجِزْ، وَإِنْ أَصَابَكَ شَىْءٌ فَلاَ تَقُلْ لَوْ أَنِّي فَعَلْتُ كَانَ كَذَا وَكَذَا، وَلَكِنْ قُلْ قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ',
    translation: 'Strive for that which benefits you, seek help from Allah, and do not lose heart. If something befalls you, do not say: "If only I had done such-and-such," but say: "It is the decree of Allah and whatever He wills, He does."',
    reference: 'Sahih Muslim, Hadith 2664 [Grading: Sahih]',
    context: 'Addressing overthinking, regret over the past, and taking constructive action in the present.',
    spiritualReflection: 'Focus your energy on what is beneficial right now, seek Allah\'s help, and do not paralyze yourself with "what-ifs". The past is written; your task is what is in your hands today.'
  },
  {
    id: 'hadith-tirmidhi-2517',
    theme: 'Tawakkul',
    category: 'HADITH',
    arabicText: 'قَالَ رَجُلٌ: يَا رَسُولَ اللَّهِ أَعْقِلُهَا وَأَتَوَكَّلُ أَوْ أُطْلِقُهَا وَأَتَوَكَّلُ؟ قَالَ: «اعْقِلْهَا وَتَوَكَّلْ»',
    translation: 'A man said: "O Messenger of Allah, should I tie my camel and rely upon Allah, or leave it untied and rely upon Allah?" He said: "Tie it and rely [upon Allah]."',
    reference: 'Jami\' al-Tirmidhi, Hadith 2517 [Graded Hasan by Al-Albani]',
    context: 'Balancing practical effort with reliance on Allah.',
    spiritualReflection: 'Tawakkul is not passive waiting; it means taking the practical lawful steps available to you, then completely releasing your worry about what you cannot control.'
  },
  {
    id: 'hadith-tirmidhi-2516',
    theme: 'Tawakkul',
    category: 'HADITH',
    arabicText: 'وَاعْلَمْ أَنَّ الأُمَّةَ لَوِ اجْتَمَعَتْ عَلَى أَنْ يَنْفَعُوكَ بِشَىْءٍ لَمْ يَنْفَعُوكَ إِلاَّ بِشَىْءٍ قَدْ كَتَبَهُ اللَّهُ لَكَ، وَلَوِ اجْتَمَعُوا عَلَى أَنْ يَضُرُّوكَ بِشَىْءٍ لَمْ يَضُرُّوكَ إِلاَّ بِشَىْءٍ قَدْ كَتَبَهُ اللَّهُ عَلَيْكَ',
    translation: 'And know that if the whole nation were to gather together to benefit you with anything, they would benefit you only with what Allah had already written for you. And if they were to gather together to harm you with anything, they would harm you only with what Allah had already written against you.',
    reference: 'Jami\' al-Tirmidhi, Hadith 2516 [Graded Sahih by Al-Albani]',
    context: 'When fearing other people\'s reactions, opinions, or decisions.',
    spiritualReflection: 'People do not hold the power to harm or benefit you outside of what Allah has decreed. You can breathe knowing that other people\'s thoughts and responses are not your master.'
  },
  {
    id: 'hadith-bukhari-6369',
    theme: 'Dua',
    category: 'HADITH',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
    translation: 'O Allah, I seek refuge in You from grief and sadness, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by men.',
    reference: 'Sahih al-Bukhari, Hadith 6369 [Grading: Sahih]',
    context: 'Supplication taught by the Prophet ﷺ against overwhelming grief (past) and worry (future).',
    spiritualReflection: 'Notice how the Prophet ﷺ sought refuge from al-hamm (anxiety about the future) and al-hazan (sorrow over the past). Experiencing these emotions is human; turning directly to Allah with them is prophetic.'
  },
  {
    id: 'hadith-bukhari-6407',
    theme: 'Akhirah Perspective',
    category: 'HADITH',
    arabicText: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ، أَوْ عَابِرُ سَبِيلٍ',
    translation: 'Be in this world as if you were a stranger or a traveler along a path.',
    reference: 'Sahih al-Bukhari, Hadith 6407 [Grading: Sahih]',
    context: 'When worldly dilemmas consume all mental energy.',
    spiritualReflection: 'This world is a brief journey. When a worldly issue feels like the end of everything, remind yourself that it is only a temporary passage.'
  }
];

export const DAILY_REFLECTIONS = [
  {
    id: 'daily-1',
    prompt: 'What are you carrying today that you cannot control?',
    subtext: 'Write it down, look at it honestly, and hand it over to Allah.',
    reminder: {
      category: 'QUR\'AN' as const,
      reference: 'Surah At-Talaq [65:3]',
      translation: 'And whoever relies upon Allah - then He is sufficient for him.'
    }
  },
  {
    id: 'daily-2',
    prompt: 'Are you responding to what happened, or to what you fear might happen?',
    subtext: 'Separate observable reality from the narrative your mind created in the quiet.',
    reminder: {
      category: 'HADITH' as const,
      reference: 'Sahih Muslim, Hadith 2664',
      translation: 'Strive for that which benefits you, seek help from Allah, and do not lose heart.'
    }
  },
  {
    id: 'daily-3',
    prompt: 'What is one thing Allah has given you today that you often overlook?',
    subtext: 'Before you measure what is missing, count what is silently sustaining you.',
    reminder: {
      category: 'QUR\'AN' as const,
      reference: 'Surah Ibrahim [14:34]',
      translation: 'And if you should count the favor of Allah, you could not enumerate them.'
    }
  },
  {
    id: 'daily-4',
    prompt: 'Is there something you need to take action on—or something you need to leave with Allah?',
    subtext: 'Differentiate between the effort you owe, and the outcome you do not own.',
    reminder: {
      category: 'HADITH' as const,
      reference: 'Jami\' al-Tirmidhi, Hadith 2517',
      translation: 'Tie your camel, and rely upon Allah.'
    }
  },
  {
    id: 'daily-5',
    prompt: 'What words have you been repeating to yourself that might not even be true?',
    subtext: 'Bring your assumptions into the light of facts and patience.',
    reminder: {
      category: 'QUR\'AN' as const,
      reference: 'Surah Ar-Ra\'d [13:28]',
      translation: 'Verily, in the remembrance of Allah do hearts find rest.'
    }
  }
];
