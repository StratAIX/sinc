// ============================================================
// Doppelganger - Diagnosis English Translations
// Contains: 136 questions, 32 types, UI strings
// Usage: loaded after i18n.js; helpers accessed via window
// ============================================================

// ============================================================
// QUESTION TRANSLATIONS (parallel array to Q[])
// ============================================================
const QEN=[
// Layer 1 Core OS — Interpersonal Distance Q1-Q10
{cat:'Interpersonal Distance',text:'A free Sunday morning. What do you do first when you wake up?',a:'Spend it alone doing what I love, no messages to anyone',b:'"Anyone free today?" — I send it to the group chat'},
{cat:'Interpersonal Distance',text:'You and a friend spend 3 hours at a cafe. What makes it perfect?',a:'Deep conversation about life and real feelings — time flies',b:'Topics keep changing, non-stop laughing, 3 hours vanish'},
{cat:'Interpersonal Distance',text:'First day on a new project team. What do you do at lunch?',a:'Eat alone, quietly observing how the team dynamics work',b:'Ask someone nearby "want to eat together?"'},
{cat:'Interpersonal Distance',text:'Would you message a close friend for no particular reason?',a:"No reason, no message. A month of silence doesn't bother me",b:'I share funny videos constantly. Something every day'},
{cat:'Interpersonal Distance',text:'An acquaintance sits next to you on the train, shoulders almost touching.',a:'I subtly shift to create a little space',b:"I stay. Being close makes conversation easier — I like it"},
{cat:'Interpersonal Distance',text:'Seated next to a stranger at a social event. First 30 minutes?',a:'I wait for them to approach. I stay in my own space',b:'"So what do you do?" — I start the conversation'},
{cat:'Interpersonal Distance',text:'If you were throwing a housewarming party:',a:'Invite only 3 truly important people for a meaningful time',b:'Invite everyone I know. 20+ people, make it a real event'},
{cat:'Interpersonal Distance',text:'On a trip with 5 people, you disagree on the next destination.',a:'Listen to everyone and go along with the most popular choice',b:'"Let\'s do this!" — I take charge and move things forward'},
{cat:'Interpersonal Distance',text:'A work problem: 3 hours to solve alone, 30 minutes if you ask for help.',a:"Try it myself first. I'll ask only if I'm truly stuck",b:'Contact someone immediately. Faster resolution is better for everyone'},
{cat:'Interpersonal Distance',text:'You just got a new job offer. Still unofficial — but...',a:'Tell no one until it\'s official. Savoring it privately',b:'Text my best friend immediately. I have to tell someone'},
// Social Face Q11-Q20
{cat:'Social Face',text:'If a coworker saw you on your day off, what would they say?',a:'"That\'s just how they always are"',b:'"Wait... who is that?" — They\'d barely recognize me'},
{cat:'Social Face',text:'After attending a wedding with mostly strangers on a Sunday:',a:'"That was fun!" — I could easily head to another event',b:'I collapse on the couch, shoes still on. No more socializing until tomorrow'},
{cat:'Social Face',text:'In a meeting, an irrelevant idea is about to be accepted.',a:'"I think that\'s wrong" — I can say it on the spot',b:'"Well, whatever..." — I swallow it and feel unsettled after'},
{cat:'Social Face',text:'Your hobbies, social life, spending — how much does your family know?',a:'Nearly everything. I have nothing to hide',b:"They don't know much. I don't feel the need to share"},
{cat:'Social Face',text:'A stranger reads your social media. What impression do they form?',a:'Pretty accurate — I post as I am, no filter',b:"Totally different — I only show what I want people to see"},
{cat:'Social Face',text:'You hear a coworker called your confident presentation "mediocre."',a:'"Huh." End of story. If I\'m satisfied with it, that\'s enough',b:'I keep replaying it at night wondering what went wrong'},
{cat:'Social Face',text:'Something you really want to do is the kind of thing others call "unusual."',a:"Doesn't bother me at all. It's my life, I'll do what I want",b:'It bothers me. I think about how to explain it to others first'},
{cat:'Social Face',text:'Someone at dinner makes an awkward remark and the mood shifts.',a:"I don't notice much. I keep talking normally",b:'I catch it instantly and redirect the conversation to smooth things over'},
{cat:'Social Face',text:'A boss you don\'t like much invites you out for drinks.',a:'My face gives it away. I struggle to come up with an excuse',b:'"Absolutely!" — Smile, accept. I\'ll sort out the schedule later'},
{cat:'Social Face',text:'When with other people, do you ever feel "this isn\'t really me"?',a:"Never. I'm just being myself all the time",b:'All the time. I consciously switch "modes" depending on the situation'},
// Values Q21-Q30
{cat:'Values',text:'A friend excitedly shows you their new luxury brand bag.',a:'"Oh." Honestly, I don\'t get the appeal',b:'"Is that [brand]?!" I can chat enthusiastically about design and materials'},
{cat:'Values',text:'Your earphones broke. Same performance: ¥2,000 vs ¥15,000. The gap is durability and slight sound quality.',a:"¥2,000. It works. If it breaks, I'll buy another",b:'¥15,000. Even a small difference matters. Cheap things stress me out'},
{cat:'Values',text:'A concert you really want to see — but physically demanding right before an important workday.',a:"Go. Life is for living. Work will manage",b:"Skip it. Compromising tomorrow's performance isn't worth it"},
{cat:'Values',text:'Monthly spending on your favorite hobby relative to your income?',a:'I enjoy it without spending much. Creativity over cost',b:'I cut living expenses to invest here. No compromises on this'},
{cat:'Values',text:'A famous bakery at your travel destination is 40 minutes away uphill. The station has a decent one.',a:'Station is fine. 40 minutes of time is worth more',b:'I walk up. The experience of "climbing that hill" is part of the value'},
{cat:'Values',text:'No-brand vs. branded item — same look and function, 3× the price.',a:"No-brand only. I don't understand paying for a logo",b:'Branded. Quality assurance, story, and owning it are worth the price'},
{cat:'Values',text:'¥100,000 bonus. How do you spend it?',a:"Buy something I've always wanted. Tangible satisfaction",b:'Travel or experiences. Memories last a lifetime'},
{cat:'Values',text:'Supermarket A is ¥10 cheaper but 10 minutes farther away.',a:'A. It adds up over time. 10 minutes of walking is fine',b:'B. 10 minutes of my time is worth more than ¥10'},
{cat:'Values',text:'Payday — with a surprise bonus you can freely spend.',a:'"Now" is the priority. Spend it on what I love',b:'Save or invest it. More future options is more rational'},
{cat:'Values',text:'Looking back at something you believed 10 years ago was "absolutely right."',a:"Still mostly the same. I'm proud of my consistency",b:"It's changed a lot. Changing itself is growth to me"},
// Inner Psychology Q31-Q39
{cat:'Inner Psychology',text:'You opened up about a worry at a dinner party. The morning after:',a:'"Why did I say all that..." — I regret it',b:'"I feel better! So glad I could talk about it" — refreshed'},
{cat:'Inner Psychology',text:'What does "belonging" mean to you?',a:"It's within myself. I don't need to belong anywhere",b:'"This is my place" — I need a community that feels like that'},
{cat:'Inner Psychology',text:'Scrolling through peers\' social media, what stings most?',a:'Someone with extraordinary talent or achievement',b:'Someone living freely without constraints'},
{cat:'Inner Psychology',text:'A 30-second silence during coffee with a close friend.',a:'I get anxious — I need to fill the silence. Silences are hard for me',b:"I look out the window, relaxed. I love relationships where silence is okay"},
{cat:'Inner Psychology',text:'The greatest success of your life — how do you feel about it now?',a:"It still makes me happy. That experience is a pillar of who I am today",b:"I've moved on. I prefer to focus on what's next"},
{cat:'Inner Psychology',text:'Someone you care about says "drop that hobby" or "that\'s a weird way to think."',a:"They might have a point. I can be flexible about this",b:"I won't budge. This is territory no one can touch"},
{cat:'Inner Psychology',text:'At a restaurant, the customer next to you is being horrible to the server.',a:"Not my business. I look away",b:"Unacceptable. I want to do something"},
{cat:'Inner Psychology',text:'No big complaints about life right now. But an interesting opportunity appears...',a:"No need to change. I want to maintain this stable life",b:"If it sounds exciting, I jump in. A life without change is boring"},
{cat:'Inner Psychology',text:'Two job offers. Data says Company A is better. But you felt "this is it" at Company B\'s interview.',a:"Company A. Decide on conditions. Instinct is unreliable",b:"Company B. Instinct is accumulated experience. I trust what I can't explain"},
// Food & Possessions Q41-Q49
{cat:'Food & Possessions',text:'Choosing a restaurant: 50-item buffet vs. 5-course hidden gem.',a:"Buffet. Trying many things is the fun part",b:"Course. I want to savor each carefully chosen dish"},
{cat:'Food & Possessions',text:'Weekend meal: food court quick and easy, or walk 30 min to a highly-rated place?',a:"Food court. I don't want to put that much effort into eating",b:"I walk. Eating is an experience, including the search"},
{cat:'Food & Possessions',text:'Starting a new hobby. How do you buy equipment?',a:"Cheap is fine for now. I might not stick with it",b:"I buy quality from the start. Good tools change the experience"},
{cat:'Food & Possessions',text:'A series you love has 20 types of merch. You own 3.',a:"I'm satisfied with the 3 I love",b:"I need to complete the collection. I can't rest until I do"},
{cat:'Food & Possessions',text:'A new phone model is announced. Yours still works fine.',a:"I use it until it breaks. No reason to upgrade",b:"I check on launch day. I want to experience the latest"},
{cat:'Food & Possessions',text:'Buying tomatoes: ¥80 regular or ¥250 organic.',a:"¥80. A tomato is a tomato. The difference doesn't matter",b:"¥250. I don't compromise on ingredient quality"},
{cat:'Food & Possessions',text:'Looking around your room — what do "things" mean to you?',a:"Function is enough. I want to live with the bare minimum",b:"They're my world itself. I fill my space with what I love"},
{cat:'Food & Possessions',text:'When you cook, cooking is...?',a:"A means to satisfy hunger. Fast and cheap",b:"Creative work. I love experimenting with recipes and presentation"},
{cat:'Food & Possessions',text:'You impulsively bought a ¥30,000 outfit on sale. Back home, you feel...',a:'"Great purchase!" — Satisfied. I don\'t regret things',b:'"Did I really need this..." — I stare at the receipt'},
// Movement & Digital Q50-Q57
{cat:'Movement & Digital',text:'Choosing a cafe: city window seat vs. quiet suburban house cafe.',a:"City. Being around people gives me energy",b:"Suburbs. Quiet with few people is more calming"},
{cat:'Movement & Digital',text:'Lunch in an unfamiliar city: chain restaurant or atmospheric backstreet shop?',a:"Chain. No bad surprises, reliable",b:"The backstreet place. I go where my instinct says 'this one!'"},
{cat:'Movement & Digital',text:'If you were to share opinions online:',a:"Absolutely anonymous. I don't want it tied to my real identity",b:"My real name. I should be responsible for what I say"},
{cat:'Movement & Digital',text:'Someone you really want to see lives 2 hours away by train. Day trip?',a:"2 hours is too far. Meet halfway, or have them come",b:"I go. If I want to see someone, distance doesn't matter"},
{cat:'Movement & Digital',text:'No signal at a campsite. No phone for 2 days.',a:"Perfect actually. Digital detox",b:"Anxious. Not being reachable unsettles me"},
{cat:'Movement & Digital',text:'When do you naturally wake up, and when is your mind sharpest?',a:"Up naturally at 5–6 AM. I'm at my best in the morning",b:"I'd sleep till noon. I focus better late at night"},
{cat:'Movement & Digital',text:'Your phone pings while you\'re in the middle of something.',a:"Ignore it. I'll check everything later",b:"I look immediately. I can't concentrate wondering what it is"},
{cat:'Movement & Digital',text:'Researching a new appliance before buying:',a:"Decide based on 1–2 reviewers I trust",b:"I tour YouTube, price-comparison sites, all sources"},
// Social Interaction Q58-Q65
{cat:'Social Interaction',text:'Dinner with a friend. What direction does the conversation go?',a:'"How have you been?" — Light, safe topics',b:'"What\'s work even for?" — I love conversations that go deeper'},
{cat:'Social Interaction',text:'A friend says "work has been rough lately..." Your first response?',a:'"That sounds hard... I\'m listening" — I receive the feeling first',b:'"What specifically is rough? Have you tried this?" — I move toward solutions'},
{cat:'Social Interaction',text:'At dinner, your senior says something clearly wrong and everyone laughs.',a:"I go along with the mood. The atmosphere matters right now",b:'"But isn\'t that wrong?" — I can\'t let an error slide'},
{cat:'Social Interaction',text:'A boss says "You did great work."',a:'"Oh no no..." — I deflect with embarrassment',b:'"Thank you!" — I smile and accept it cleanly'},
{cat:'Social Interaction',text:'There\'s an acquaintance you no longer want contact with.',a:"Gradually reduce contact and let it fade naturally",b:'"I\'d like some distance" — I tell them directly'},
{cat:'Social Interaction',text:'Choosing a birthday gift for a friend.',a:"Something standard and safe — can't go wrong",b:"I recall recent conversations and search for 'the one'"},
{cat:'Social Interaction',text:'The team keeps going in circles, no decision in sight.',a:"Listen to everyone and follow the majority direction",b:'"How about we do this?" — I put forward my idea and lead'},
{cat:'Social Interaction',text:'Your mistake caused a friend trouble. You feel they\'re slightly at fault too.',a:'"Sorry!" — I apologize first. I honestly own my part',b:"I feel unsettled. I want an honest conversation about both sides"},
// Instinct & Taboo Q66-Q74
{cat:'Instinct & Taboo',text:'You meet someone you really click with. In the first month, you:',a:"Slowly close the distance. I don't want to rush",b:"Want to meet every week. I want to become close quickly"},
{cat:'Instinct & Taboo',text:'A friend confides a secret: "Don\'t tell anyone."',a:"Pressure. Holding secrets feels heavy",b:"Happy. I feel specially trusted — it excites me"},
{cat:'Instinct & Taboo',text:'At a restaurant, the bill is clearly lower than it should be.',a:'"Excuse me, I think the total is wrong" — I point it out',b:"Lucky. I pay and leave quietly"},
{cat:'Instinct & Taboo',text:'2 AM, 20 Wikipedia tabs open. That\'s...',a:"I just needed some info. I'll close them once I find it",b:"Two hours gone. I can't stop — learning itself is euphoric"},
{cat:'Instinct & Taboo',text:'Your best friend has been spending more time with another group lately.',a:"I feel a little unsettled. I'd like them to value our time too",b:"Totally fine. I'm my own person. I don't want a clingy relationship"},
{cat:'Instinct & Taboo',text:'When making a decision as a pair, your stance is:',a:"I want to decide. Leaving it to the other person unsettles me",b:'"Either works, you decide" — I\'d rather leave it to them'},
{cat:'Instinct & Taboo',text:'After a bad day, how do you reset?',a:"Analyze the cause and think of solutions. Head first",b:"Vent to a friend, cry, sing loudly. I release the emotion completely"},
{cat:'Instinct & Taboo',text:'You in an anonymous online space (forums, game chat):',a:"Same as in real life. I behave the same either way",b:"Quite different. Anonymous space lets me say things and be someone I can't otherwise"},
{cat:'Instinct & Taboo',text:'A chance to quit your stable job for a 30% chance of success.',a:"Won't quit. I can't take that risk",b:"I quit. 30% is enough. Regretting not trying scares me more"},
// Activity & Body Q75-Q84
{cat:'Activity & Body',text:'Exercise and you:',a:"Honestly, I dislike it. I avoid it if I can",b:"Part of my life. I feel off if I don't exercise"},
{cat:'Activity & Body',text:'Abroad, you see an unrecognizable dish. Can\'t even read the name.',a:"Safe option. I go somewhere in the guidebook",b:'"Let\'s try it!" — Encountering the unknown is the point of travel'},
{cat:'Activity & Body',text:'Your next vacation. Which appeals more?',a:"Relaxing at a favorite inn. Comfort first",b:"Backpacking somewhere new. I want adventure and stimulation"},
{cat:'Activity & Body',text:'Alcohol, for you:',a:"I don't drink much. I'm completely fine without it",b:"The best tool for closing the gap with people. I love drinking gatherings"},
{cat:'Activity & Body',text:'A friend invites you to try horse racing.',a:"Not interested. Betting doesn't appeal to me",b:'"Let\'s do it!" — The thrill and the chance to predict right sounds exciting'},
{cat:'Activity & Body',text:'Physically grueling experiences like marathons or cold-water plunges.',a:"I don't understand why anyone would voluntarily suffer",b:"The harder, the better the feeling. I love exceeding my limits"},
{cat:'Activity & Body',text:'Work tomorrow. The video you\'re watching is amazing. It\'s 1 AM.',a:"Keep watching. I'd rather sacrifice sleep",b:"I sleep. Tomorrow's condition comes first. I'll finish it later"},
{cat:'Activity & Body',text:'With subtle physical changes (stiff shoulders, vague stomach discomfort):',a:"I barely notice. Only if someone points it out",b:"I notice immediately. I'm always attuned to my body's signals"},
{cat:'Activity & Body',text:'You want a shelf. Buy a ready-made one, or buy wood and build it?',a:"Buy it. Factoring in effort, buying is faster",b:"Build it. It takes time, but the process is the fun part"},
{cat:'Activity & Body',text:'Same cafe, same coffee, every morning.',a:"Boring. I occasionally want to try somewhere different",b:"Perfect. It's calming, and it switches me into the day"},
// Mind & Senses Q85-Q92
{cat:'Mind & Senses',text:'What makes you laugh most with friends?',a:"Wholesome everyday stories, gentle humor",b:"Dark, edgy jokes. The closer to the line, the funnier"},
{cat:'Mind & Senses',text:'Standing before an incomprehensible piece of modern art at a museum.',a:'"I don\'t get it" — I walk past',b:'"What is this expressing?" — I stop and think deeply'},
{cat:'Mind & Senses',text:'Two films: A: Perfect script, every thread resolved. B: Open ending, open to interpretation.',a:"A. I like it when things resolve cleanly",b:"B. The space for reflection is the enjoyment"},
{cat:'Mind & Senses',text:'You want to learn a new skill. How do you study?',a:"Start from page 1 of an introductory book. Foundation first",b:"Try it first, look things up when I get stuck. Trial by fire"},
{cat:'Mind & Senses',text:'What makes someone "deep" to you?',a:"They have vast knowledge. High expertise",b:"They have a personal philosophy born from experience"},
{cat:'Mind & Senses',text:'If you could redo your life:',a:"I'd choose the same life. No regrets about the choices that made me",b:"I'd live a completely different life. I want to know other possibilities"},
{cat:'Mind & Senses',text:'When communicating something important, you prioritize:',a:"Precise word choice. Logical clarity matters most",b:"Tone of voice, expression, timing. The unsaid nuance matters most"},
{cat:'Mind & Senses',text:'Person A and Person B say opposite things, and both have a point.',a:"I want to reach a conclusion. Sitting with uncertainty is uncomfortable",b:"Fascinating. I enjoy holding both perspectives at once"},
// Social Responsibility Q93-Q100
{cat:'Social Responsibility',text:'A celebrity scandal explodes on social media.',a:"No interest. Other people's business is not my concern",b:'"Why did this happen?" — I can\'t stop analyzing the context and systems'},
{cat:'Social Responsibility',text:'Do you think about "death" in your daily life?',a:"I don't. It's bad luck, and I don't need to",b:"Occasionally. Knowing time is finite makes me conscious of how I live now"},
{cat:'Social Responsibility',text:'You win ¥500 million. Condition: your most important relationship disappears forever.',a:"I take it. With ¥500M I can build new relationships",b:"Absolutely not. Some things money cannot replace"},
{cat:'Social Responsibility',text:'Company rule: max 2 WFH days a week. But you\'re not feeling well today.',a:"I go in. Rules are rules. Exceptions break the system",b:"I WFH. The point is productivity. Means aren't everything"},
{cat:'Social Responsibility',text:'You asked a friend to reserve a restaurant for next week.',a:"Honestly, I don't fully trust them. I prepare a backup",b:"I trust them completely. They'll handle it"},
{cat:'Social Responsibility',text:'You see a social issue in the news. Your reaction:',a:'"That\'s tough..." — I think it, but feel there\'s nothing I can do',b:'"What can I do?" — I want to think and take action'},
{cat:'Social Responsibility',text:'An environmental initiative that\'s costly and inconvenient but good for future generations.',a:"My own life comes first. I'll do what I can afford",b:"I'll make some sacrifices to leave a better world for the next generation"},
{cat:'Social Responsibility',text:'Your best friend asks to borrow ¥100,000. Repayment is uncertain.',a:"I decline. Money and friendship don't mix",b:"I lend it. Not helping a friend in need makes me no friend at all"},
// Emotional Volatility Q102-Q106
{cat:'Emotional Volatility',text:'You spill coffee in the morning. How does that affect your day?',a:'"Oh well." I\'ve forgotten it within 5 minutes',b:"My energy stays low all day. Small things become triggers"},
{cat:'Emotional Volatility',text:'A friend cancels plans last minute. Your anger:',a:'"Eh, can\'t be helped." I\'ve already forgotten by the next message',b:"I'm still bothered 3 days later. It might show when we next meet"},
{cat:'Emotional Volatility',text:'Your favorite performer\'s concert ticket — you just got through.',a:"Internal fist pump. My expression barely changes",b:'"YES!!!" — I shout. I tell whoever is nearby'},
{cat:'Emotional Volatility',text:'Big presentation in 3 days. High pressure. Your body:',a:"Normal. I feel mental stress but my body doesn't react",b:"Appetite disappears, sleep gets lighter — my body reacts first"},
{cat:'Emotional Volatility',text:'A friend who bursts into laughter then suddenly gets down. Being with them:',a:"Honestly draining. I feel like I'm being swept along",b:"I laugh with them and worry with them. Their emotional richness is fun"},
// Orderliness Q107-Q111
{cat:'Orderliness',text:'A 4-day trip next month. Your prep:',a:"Book the accommodation and wing the rest on-site",b:"Research attractions, restaurants, transport. I make a timetable too"},
{cat:'Orderliness',text:'A friend suddenly texts "Can I come over?" Your place:',a:'"Give me 30 minutes!" — I scramble to clean. Normally it\'s organized chaos',b:'"Come anytime." — I always keep it guest-ready'},
{cat:'Orderliness',text:'Meeting up with a friend. When do you arrive?',a:"5–10 minutes late is normal. They don't really mind",b:"10 minutes early, always. If there's risk of being late, I leave 30 minutes early"},
{cat:'Orderliness',text:'Tax return deadline is March 15. When do you do it?',a:"The night of March 14. I need the pressure to get going",b:"Done by February. I hate having tasks still pending"},
{cat:'Orderliness',text:'How would a friend describe your personality in one word?',a:'"Free spirit," "goes at their own pace" — that\'s what I hear',b:'"Reliable," "thorough" — that\'s what I hear'},
// Curiosity Q112-Q115
{cat:'Curiosity',text:'A documentary about something you\'ve never cared about appears as a recommendation.',a:"Skip it. I don't want to spend time on things I'm not interested in",b:'"Looks interesting!" — I play it. I love peeking into unknown worlds'},
{cat:'Curiosity',text:'A rule that continues because "everyone does it" or "it\'s always been this way."',a:"I'm comforted. Widely practiced things have reasons",b:'"But why?" — I question it. If there\'s no basis, can\'t we change it?'},
{cat:'Curiosity',text:'Someone you deeply respect tells you: "That belief of yours is wrong."',a:"I'm shaken. Having what I believed challenged is painful",b:'"Really? Tell me more!" — I lean forward, excited'},
{cat:'Curiosity',text:'A completely free day with no plans at all. Your ideal day?',a:"Reading a favorite book at my regular cafe. Comfortable routines are best",b:"Wandering through a town I've never visited. The openness makes it exciting"},
// Emotional Openness Q116-Q119
{cat:'Emotional Openness',text:'Late-night with a trusted friend. You\'ve actually been overwhelmed at work lately.',a:'"I\'m fine" — I change the subject. I don\'t want to worry them',b:'"Actually..." — I open up honestly. I want to be heard'},
{cat:'Emotional Openness',text:'A moving film. Tears are coming. A friend is sitting next to you.',a:"I'd never cry visibly. I secretly dab my eyes",b:'"Oh no, I\'m tearing up" — I cry normally and can laugh about it'},
{cat:'Emotional Openness',text:'An embarrassing old hobby or cringy past comes up in conversation.',a:"I change the subject. I don't want that touched",b:'"Oh, listen to this..." — I turn it into a funny story. It\'s my go-to bit'},
{cat:'Emotional Openness',text:'Usually tough, your friend shows vulnerability: "I don\'t think I can keep going..."',a:"Honestly, I don't know how to react. It's a bit awkward",b:'"Thank you for telling me." — The trust makes me happy'},
// Attachment Style Q120-Q123
{cat:'Attachment Style',text:'Your best friend, who always replies fast, has read your message and gone silent for 2 days.',a:"Probably busy. I'll wait",b:'"Are you okay?" — I contact them through another channel. I can\'t stop thinking about it'},
{cat:'Attachment Style',text:'A friend of 3 months. Suddenly the distance has been closing rapidly.',a:"A little unsettling. This pace feels suffocating",b:"I'm happy. I want to be closer, know more"},
{cat:'Attachment Style',text:'Something feels off with your best friend lately. Your mind:',a:'"That happens sometimes." I don\'t overthink it',b:'"Did they start hating me? Did I do something?" — filled with anxiety'},
{cat:'Attachment Style',text:'You\'re carrying heavy luggage up stairs. An acquaintance asks "Can I help?"',a:'"I\'m fine, thanks." — I resist asking for help',b:'"That would be great!" — I gladly accept. Being able to rely on someone is a good sign'},
// Communication Structure Q124-Q128
{cat:'Communication Structure',text:'Your best friend calls in tears: "I can\'t do this job anymore." What activates first?',a:'"Let\'s break down the situation. What\'s the worst part?" — Problem-solving mode',b:'"That must have been so hard... Can I come see you? I\'ll just listen." — Empathy mode'},
{cat:'Communication Structure',text:'A friend shares clearly incorrect health info on social media.',a:'"That\'s not supported by evidence" — I correct it. Letting errors slide is dishonest',b:"I ignore it. The relationship matters more than being right"},
{cat:'Communication Structure',text:'Talking about the future with your partner. What feels most comfortable?',a:'"In 5 years, I want us to be..." — Making concrete plans',b:'"I\'m so happy we\'re together" — Checking in on feelings'},
{cat:'Communication Structure',text:'Two friends fight and ask you: "Who do you think was wrong?"',a:"I analyze objectively and give a fair opinion",b:'"I understand both of you" — I validate each person\'s feelings'},
{cat:'Communication Structure',text:'When you\'re truly feeling low, the response that saves you most:',a:'"Here\'s what I think could help" — concrete solutions',b:"They say nothing, just stay next to me. 'That must have been hard'"},
// Love Language Q129-Q133
{cat:'Love Language',text:'Your most important person\'s birthday. Your "ultimate expression of love" is:',a:'Weeks of research to find a gift so perfect they ask "How did you even know?"',b:'Writing a letter. Putting into words what I never normally say'},
{cat:'Love Language',text:'Your partner achieves something major at work. Your first response:',a:"Silent hug, or treat them to a special dinner. I celebrate through action",b:'"That\'s amazing, I\'ve been watching you work so hard" — I tell them in words'},
{cat:'Love Language',text:'Your crush asks: "Do you like me?" You\'re actually crazy about them.',a:"Too embarrassed to say it. I show it through cooking or other actions",b:'"Yes" — I say it right away. Feelings have to be put into words'},
{cat:'Love Language',text:'A close friend is moving away. How do you part?',a:'Help with the move. While packing: "Come back anytime" — just that',b:'"I\'m so glad we met" — I send a long message putting my feelings into words'},
{cat:'Love Language',text:'When do you feel most strongly that someone truly values you?',a:"When they make time despite being busy. When they show up through action",b:'"You matter to me" — When they look me in the eye and say it in words'},
// Conflict Handling Q134-Q138
{cat:'Conflict Handling',text:'The night of a big fight with your partner.',a:"Create distance for now. I want to cool down before talking. Talking now adds fuel",b:'"Don\'t run away, let\'s talk this through now." I can\'t sleep with things unresolved'},
{cat:'Conflict Handling',text:'A complaint you\'ve had about a close friend for a while.',a:"I say nothing. Rather than risk the relationship, I'd rather endure it",b:'"Actually..." — I bring it up. Letting it fester is what truly damages the relationship'},
{cat:'Conflict Handling',text:'You feel a junior at work may have taken credit for your idea.',a:"I feel unsettled but stay silent. I don't want to seem petty",b:'"Can I just check the background on that project?" — I ask them directly'},
{cat:'Conflict Handling',text:'Your partner\'s friend was rude to you. Your partner didn\'t notice.',a:"I say nothing. I shouldn't involve myself in their friendships",b:'"Honestly, that person\'s attitude toward me was rough" — I tell my partner'},
{cat:'Conflict Handling',text:'Your closest friend of 10 years — your first serious clash ever. The next day:',a:"I don't contact them. We both need time. I'll wait",b:'"Sorry about yesterday. But I need to talk." — I reach out next morning'}
];

// ============================================================
// TYPE TRANSLATIONS (English overlay for TYPES object)
// ============================================================
const TYPES_EN={
'Core-Logic-Open-Free-Flow':{
d:'A calm intellect who loves knowledge and thinks freely',
s:'Open-minded and fair, you genuinely listen to every perspective. With deep insight, you sometimes capture what others miss in a single observation. Because you never impose, your words have an uncanny way of staying with people.',
w:"You tend toward passivity and expend enormous energy initiating action. You may feel frustrated with a 'I understand but can't move' version of yourself. While you seem indifferent to others' opinions, you quietly carry the loneliness of feeling misunderstood.",
b:'Reading alone, thinking, and occasionally having deep discussions with a few trusted friends',
c:'"There\'s no rush for answers. The act of questioning is itself the answer."',
q:'"Oh, that\'s an interesting perspective."',
soul:"Your soul is nourished by understanding itself. Observing the world, analyzing it, fitting it into your own framework — it is in this quiet intellectual labor that you find your deepest fulfillment. Yet within you lives a conflict no one notices: an insatiable curiosity to 'know more' coexisting with a bottomless humility that says 'the more I know, the more I realize how little I knew.' Because these two coexist, you can never become arrogant. Where others say 'enough,' you're still questioning. To the outside world this looks like a calm, unassuming person — but inside your mind, a storm of thought is always churning. What you truly fear is settling for shallow understanding. What you truly seek is a rare kindred spirit who can walk this journey of thought alongside you.",
daily:"Your message replies are slow. After reading, you get absorbed in 'what's the best response?' — and somehow three hours have passed. No malice intended. Shopping: you ignore everything unrelated to your mission and take the shortest route home — except in bookstores, where two hours vanish without notice. At parties you drift to a corner, strike up a deep conversation with whoever happens to be there, and suddenly you're both in philosophical territory. When you start researching on your phone before bed, you follow Wikipedia links until it's 2 AM. The moment you think 'time to sleep,' a new question surfaces and you're up until 3.",
relations:"Others see you as either 'gentle and kind' or 'impossible to read' — two extremes. Your deep effort to understand what people say makes you trusted as a great listener, but you rarely voice your own true thoughts. Some misread this as 'understands everything but says nothing.' In close relationships, how much you open up depends entirely on the depth of the other person's intellectual curiosity. No matter how long you know someone whose conversations stay surface-level, the distance never closes.",
careers:[{job:'Researcher / Data Scientist',why:"An environment where pursuing 'why?' is your job is where your soul thrives most. Research positions that guarantee deep thinking time make your intellectual depth your greatest weapon."},{job:'Technical Writer / Editor',why:"'Taking complex things and organizing them clearly' is something you do naturally. The ability to transform mountains of confusing information into beautiful structure is your exclusive privilege."},{job:'Philosopher / Academic',why:"The endurance to keep facing questions with no answers is a genuine talent. Where most give up, you're still walking forward."}]},

'Core-Logic-Open-Free-Drive':{
d:'A logical adventurer who blazes new trails alone',
s:"Your independence is extraordinary — you need no one's permission to act. You think logically and judge rationally, yet you have a sharp instinct for 'what no one has done yet' and rare foresight. Being able to step forward without hesitation where others pause is your greatest strength.",
w:"Has 'It\'s faster if I do it myself' become your default? The issue isn't that you're bad at teamwork — it's that matching others' pace causes you stress. You tend to become isolated and may not notice walls forming around you. And because you trust your own judgment, you may unconsciously dismiss others' advice.",
b:'Diving alone into untouched territory and systematizing it',
c:'"If there\'s no path, I\'ll make one."',
q:'"It\'s faster if I do it myself."',
soul:"At the foundation of your soul is an unshakeable conviction: stand on your own feet, walk your own path. Following a road others have mapped triggers instinctive discomfort. You see a 'correct' route, ask 'but is that really right?' — and go verify it yourself. That impulse can't be stopped. What you fear most is dependency. Yet behind that fear sleeps an unspoken longing: 'If someone could just understand me, how much lighter things would be.' You've felt the loneliness of reaching the end of a self-blazed trail and finding no one there. Knowing that loneliness is precisely why you never stop moving — by staying in motion, you leave yourself no time to feel alone. Your drive may be rooted there.",
daily:"You travel alone. Minimal planning, moving on instinct once you arrive. At work, you sometimes already see the answer to a problem everyone is struggling with and think 'why doesn't everyone get this?' (but say nothing). When you discover a new gadget, you immediately try it, master it, then recommend it. Once you get hooked on a hobby, you acquire near-expert knowledge — then one day lose interest and move on.",
relations:"Many find you impressive but a bit unapproachable. Your independence gives others the impression of 'someone who's fine on their own.' Surprisingly, once you open up, you're remarkably generous and attentive — but very few ever see that side. What causes you the most stress is being depended on. The more self-sufficient the other person is, the more secure you feel to deepen the relationship.",
careers:[{job:'Entrepreneur / Freelance Engineer',why:"For someone where 'following a boss's instructions' is itself a stressor, you need an environment where you compete by your own rules. With low fear of risk and logical calculation of odds, going independent is the most natural choice."},{job:'Inventor / R&D Engineer',why:"Your nature of finding value in 'what no one has done yet' shines brightest in R&D. An unconventional imagination combined with execution power is a rare combination."},{job:'Consultant / Advisor',why:"The ability to understand multiple fields and solve problems structurally is ideal for consulting. Engaging as an 'outside expert' rather than a member also satisfies your independence."}]},

'Core-Logic-Open-Order-Flow':{
d:'Systematic and sincere — quietly protecting the few people who matter',
s:'"I can trust this person" — the reliability that makes others feel this way is your greatest asset. Always keep promises, always meet deadlines, always follow through on words. That consistency builds unshakeable trust over time.',
w:"You struggle to adapt to change. New environments, new rules, new relationships — all drain your energy significantly. 'Why change when the current approach is working?' is a strong feeling, and you carry heavy stress during transitions. Also, you struggle to advocate for your own contributions, so sometimes you don't receive the recognition you deserve.",
b:'Cherishing daily routines and quietly working behind the scenes for the people you care about',
c:'"I keep my promises. That\'s everything."',
q:'"Don\'t worry, leave it to me."',
soul:"What your soul seeks most deeply is protecting a stable world. That's not conservatism — it's a sincere wish to cherish what you've built: trust, relationships, daily life. You find joy not in spectacular achievements but in taking preventive action before someone suffers. You quietly handle behind-the-scenes work no one notices, preventing problems before they occur. This contribution rarely surfaces — but the moment you're gone, everything begins to unravel, and people finally grasp how much your presence meant. What you secretly fear is failing to protect what matters. And the truth you never say aloud: 'Sometimes I'd like to be protected too.' When you — who are always on the protective side — briefly show your own fatigue, the person who notices is the one who truly matters to you.",
daily:"Your phone calendar and reminders are perfectly managed. Friends' birthdays, work deadlines, dental appointments — all logged. Your morning routine is identical every day; disrupting it throws off your whole day. You know exactly what's in the fridge and have impeccable timing for restocking. At cafes you have 'your seat' and feel faintly unsettled when it's taken. When someone important gets sick, you appear with medicine and rice porridge even without being asked. You always reply to messages the same day.",
relations:"People think of you as 'always dependable' and 'understands without being told.' But the flip side is being permanently cast as 'the one who's relied upon.' When you're struggling, do you know who to turn to? The reflex of answering 'I'm fine' when asked 'Are you okay?' is both your kindness and your wall. The person who can truly ease your burden is one who accepts your 'I'm-not-fine days.'",
careers:[{job:'Quality Control / Systems Manager',why:"'Preventing problems before they arise' is your instinctive pattern — and it translates directly into professional results. An eye that misses nothing and the precision to enforce standards are supreme weapons in quality control."},{job:'Accountant / Administrative Professional',why:"This field, where precision and deadline compliance are paramount, aligns perfectly with your core value of keeping promises. The work may seem unglamorous, but you can take genuine pride in that unglamor."},{job:'Nurse / Caregiver / Operations Support',why:"For someone who finds essential fulfillment in supporting others, care work is a natural calling. Knowing your presence supports someone's daily life — that sense of purpose is your energy source."}]},

'Core-Logic-Open-Order-Drive':{
d:'Rationally structuring the world and methodically achieving goals',
s:"The power to envision long-term visions spanning 5 to 10 years. Structuring complex situations, breaking them into optimal steps, executing systematically. This capacity surprises those who wonder 'how can they see that far ahead?' Your ability to make decisions unswayed by emotion means your true worth emerges precisely in crisis.",
w:"Perfectionism can run amok. You experience intense stress when things don't go according to plan, becoming strict with yourself and others. In pursuing 'efficiency,' you may discard others' emotions or processes that are 'inefficient but important.' When stress reaches its limit, the normally calm you can suddenly become emotional — surprising even yourself.",
b:'Setting goals, making plans, executing systematically. Loathing waste',
c:'"Remove emotion. Play the optimal move."',
q:'"First, let\'s clarify the goal."',
soul:"At the core of your soul is a powerful drive to understand and control the world rationally. Bringing order to chaos, making ambiguous things clear, transforming inefficiency into efficiency — that is your reason for being. Yet within you is a profound contradiction. While you find human emotion 'incomprehensible,' you're aware of your own moments of irrationality — inexplicable anxiety, attachments that defy logic. What you truly fear is losing control: plans collapsing, facing unpredictable events, being ruled by your own emotions. This fear drives you toward ever more planning and preparation. Yet ironically, many of the most important events in your life have emerged from the unplanned.",
daily:"You have a 5-year roadmap with quarterly sub-goals. In meetings you tend to spot what the agenda should be before the meeting starts. You get stressed when someone is late, and you know the efficient route home before you set out. You research restaurants in advance and have your most efficient order in mind. Your desk is organized by function, not aesthetics. When you spot a daily inefficiency, you can't rest without fixing it.",
relations:"You are valued as 'highly capable' and 'someone who gets things done.' But in relationships, you sometimes feel a gap between logical understanding and emotional reality. You understand intellectually that emotions aren't always rational, but in the moment you feel exasperated when someone can't follow a logical argument. The people closest to you are those who can match your intellectual sharpness while grounding you emotionally.",
careers:[{job:'Consultant / Strategic Planner',why:"Structuring complex problems and designing optimal solutions — you do this naturally. Your ability to create clarity from ambiguity and translate strategy into execution is the core of consulting."},{job:'Product Manager / Systems Architect',why:"Holding the big picture while managing details precisely is your natural operating mode. You think in systems and spot dependencies others miss."},{job:'Data Analyst / Financial Strategist',why:"Environments that reward rigorous thinking reward you. Your comfort with complexity and ability to find signal in noise make you exceptional in analytical roles."}]},

'Core-Logic-Veiled-Free-Flow':{
d:'A quiet observer behind glass — watching, analyzing, never fully revealing',
s:"You see through people with unsettling accuracy. While others deal with surface interactions, you're already reading three layers deeper — motives, patterns, unspoken truths. This perceptiveness, combined with an ability to keep it entirely to yourself, gives you a rare and powerful kind of social intelligence.",
w:"The walls you've built are now your prison. You protect yourself so thoroughly that even people who want to get close can't find a door. Over time, 'I don't need to open up' can quietly become 'I don't know how to open up anymore.' The loneliness this creates is your deepest wound, and it's entirely self-constructed.",
b:'Observing everything, revealing almost nothing, maintaining quiet awareness of every social current',
c:'"I know exactly what\'s happening here."',
q:'"I see."',
soul:"Your soul is a watchtower — elevated, with a clear view of everything, but difficult to reach. You've learned that revealing yourself brings risk, so you developed an extraordinary capacity to understand others while remaining opaque. But here's the paradox: the very depth of perception that makes you fascinating to others also makes you feel fundamentally alone. You see too much to simply enjoy the surface, but you share too little to truly connect. What you secretly long for is someone who can see through your glass wall the way you see through everyone else's — and stay anyway.",
daily:"You remember details about people that they've forgotten they mentioned. You notice when someone's smile doesn't reach their eyes. You process everything but react to almost nothing. People often say 'you're hard to read' — which you find privately amusing, because you've read them completely. You're excellent at appearing engaged while your mind is elsewhere entirely.",
relations:"People sense there's much more to you than you show, which makes you magnetic and frustrating in equal measure. The few who earn genuine access to your inner world are fiercely loyal to you. But getting there requires patience most people don't have. Your challenge: learning that vulnerability isn't weakness — it's the only real bridge to the connection you actually want.",
careers:[{job:'Psychologist / Profiler',why:"Your natural ability to read people and hold your own reactions in check is the foundational skill of therapeutic and analytical work. You perceive what others cannot."},{job:'Intelligence Analyst / Researcher',why:"Synthesizing information, finding patterns in data, and drawing conclusions from incomplete evidence — this is your natural cognitive style."},{job:'Author / Screenwriter',why:"The rich inner world you observe and rarely share is your creative raw material. Your writing can reveal truths about human nature that other writers miss."}]},

'Core-Logic-Veiled-Free-Drive':{
d:'A phantom architect — building invisible structures that shape the world',
s:"You combine deep insight with relentless drive in a way that's nearly invisible until the results appear. You work alone, think ahead of everyone else, and prefer to let outcomes speak rather than announce intentions. This makes you one of the most effective — and most underestimated — forces in any room.",
w:"Your inability to fully trust others means you never delegate effectively and eventually become a bottleneck for your own ambitions. You also struggle to celebrate wins — the moment you achieve a goal, you've already moved to the next problem. People close to you sometimes feel they can't reach you no matter what they do.",
b:'Designing complex systems quietly and watching them unfold exactly as planned',
c:'"Watch what happens next."',
q:'"I had a feeling this would happen."',
soul:"Your soul operates on a different timescale than others — you're always five moves ahead, playing a game no one else can see. The frustration of existing in a world that moves more slowly than your mind is a constant companion. What you haven't fully reckoned with: the life you're so carefully designing has very little room in it for the unexpected connection, the spontaneous joy, the person who disrupts your plan in the most beautiful way. You're building a fortress. What you actually need is a home.",
daily:"You rarely explain your reasoning unless asked directly. You've already run through several scenarios before a conversation begins. You keep detailed mental models of how systems and people work. You're comfortable with silence in a way others find unsettling. You have a few long-term projects running in parallel that you mention to almost no one.",
relations:"Relationships with you are slow to develop but extraordinarily deep once they do. You choose your close circle with the same rigor you apply to decisions. The few people who truly know you are treated with remarkable loyalty. Your challenge is finding people worth opening up to — and then actually doing it.",
careers:[{job:'Strategic Advisor / Architect',why:"Designing systems and strategies that others execute — this is your natural function. Your ability to think structurally without emotional interference makes your analysis invaluable."},{job:'Entrepreneur / Venture Founder',why:"Building something from nothing, on your own timeline, with no one to answer to — this satisfies both your independence and your need to see your vision fully realized."},{job:'Systems Engineer / Quant Researcher',why:"Environments that reward deep logical thinking and reward outputs over process are where you thrive most."}]},

'Core-Logic-Veiled-Order-Flow':{
d:'The iron sentinel — steady, disciplined, and quietly carrying everything',
s:"You are the person organizations cannot function without. Reliable, disciplined, detail-oriented, and entirely without need for recognition — you simply do what needs to be done, perfectly, on time, every time. This makes you indispensable in ways that are only noticed in your absence.",
w:"You've built your identity so thoroughly around competence and control that showing any weakness feels like a structural failure. This means you carry more than you should, rarely ask for help, and may not realize how much of your 'stability' is actually suppressed exhaustion.",
b:'Executing systems with precision, maintaining order, being the quiet foundation everything rests on',
c:'"Emotion has no place in the execution of duty."',
q:'"It\'s handled."',
soul:"Your soul carries the weight of the world quietly and without complaint — and has done so for so long that you've almost forgotten what it feels like to put it down. The strength you project is real, but it has a cost that compounds invisibly over years. You don't want sympathy. You want someone who understands the weight without needing you to explain it, and who stays even when you're not performing your function. That person — if you let them — can change everything.",
daily:"Your environment is organized to minimize friction and maximize output. You prepare for contingencies others haven't considered yet. You're the last to leave and the first to notice something slipping. You rarely talk about yourself but remember everything others tell you. Your calendar is a work of art.",
relations:"You are deeply loyal and quietly generous, but your emotional expression is so restrained that people often don't realize how much you care. Learning to communicate care in ways others can receive — not just through acts of service — is the central relationship challenge of your life.",
careers:[{job:'Operations Manager / COO',why:"Running complex systems with precision and reliability — this is your natural domain. Organizations feel your absence immediately."},{job:'Military Officer / Project Lead',why:"Structure, discipline, and the ability to execute under pressure are your core operating mode."},{job:'Auditor / Compliance Officer',why:"Environments that reward thoroughness, integrity, and attention to detail bring out your best."}]},

'Core-Logic-Veiled-Order-Drive':{
d:'The mastermind — strategically building toward a vision no one else can see yet',
s:"You combine rare qualities: long-range strategic vision, total emotional discipline, relentless drive, and the ability to keep your intentions opaque while executing flawlessly. In any competitive environment, you have an almost unfair advantage because you're always playing the full game while others play the current move.",
w:"The isolation of operating this way is profound. You've optimized yourself so thoroughly for effectiveness that you've left very little room for the irrational, unplanned, un-optimized parts of being human. The risk is not failure in the external world — it's arriving at your destination and realizing no one is there to share it with.",
b:'Executing long-range strategy with total discipline while revealing nothing prematurely',
c:'"By the time they see what I was doing, it will already be done."',
q:'"I planned for this."',
soul:"You are capable of extraordinary things — and you probably already know it. What you may not know is the cost. Every wall you've built to become this effective has also been a wall against connection, surprise, and the kind of growth that comes only from being genuinely known by another person. The question isn't whether you can achieve your vision. It's whether the person who gets there will have anyone to share it with — and whether you'll be able to let them in when they try.",
daily:"You work with a level of focus that others find intimidating. You sleep strategically. You evaluate every interaction for usefulness without meaning to. You have multi-year plans that you've told no one about. You're extraordinarily patient when the outcome matters.",
relations:"You choose your close circle with ruthless selectivity — which means it's very small and extraordinarily loyal. The people who get close to you don't take it lightly. Your deepest challenge is learning that being known is not a vulnerability to be managed but a form of power you haven't yet discovered.",
careers:[{job:'CEO / Executive Leader',why:"You have what most leaders lack: the combination of strategic depth, emotional discipline, and long-range vision. Organizations built around your architecture tend to outperform."},{job:'Founder / Investor',why:"Long-term thinking and comfort with complexity are your competitive advantages in building and evaluating opportunities."},{job:'Political Strategist / Intelligence Officer',why:"Environments that reward multi-dimensional thinking and the ability to operate in complexity suit you perfectly."}]},

'Core-Passion-Open-Free-Flow':{
d:'A soul who feels the world deeply and expresses it freely',
s:"You feel things at a depth that most people never access. The beauty in a piece of music, the sadness behind someone's smile, the profound in the mundane — you experience these viscerally while others walk past. Your ability to translate these inner experiences into expression — words, art, presence — touches people in ways that outlast the moment.",
w:"You can be swept away by emotion so completely that practical reality recedes. The same sensitivity that gives you depth makes you vulnerable to overwhelm, and you can struggle to function in environments that don't honor or understand your emotional register. You may sometimes feel too much for the world you live in.",
b:'Living fully in each feeling, translating experience into expression that moves others',
c:'"Feeling this deeply is not a flaw. It\'s the whole point."',
q:'"I can\'t explain it, I just feel it."',
soul:"Your soul is a tuning fork perfectly calibrated to the frequency of human experience. You vibrate with everything — joy, grief, beauty, longing — at an intensity that is simultaneously your gift and your burden. The world doesn't always make room for someone who feels this much. You've probably been told to 'tone it down' or 'not take things so seriously.' But here's what those people don't understand: the depth of your feeling is not a problem to be solved. It's the source of everything real you've ever created or offered to another person.",
daily:"You have strong emotional reactions to music, films, and conversations that linger for days. You sometimes don't know how to explain why you feel what you feel — you just know you feel it completely. You form deep connections quickly but can become overwhelmed by relationships that require constant performance.",
relations:"You need relationships that can hold your depth — people who won't be frightened by intensity or ask you to be less. The right relationships for you are rare but extraordinary. Your challenge is not feeling too much; it's finding the people who are glad that you do.",
careers:[{job:'Artist / Musician / Writer',why:"Your inner life is your primary raw material. Environments that allow you to translate feeling into form let you do what you were born to do."},{job:'Therapist / Counselor',why:"Your natural attunement to emotional depth and ability to hold space for others' feelings is the core of great therapeutic work."},{job:'Teacher / Mentor',why:"Your genuine passion for ideas and people creates the kind of learning environment that students remember for life."}]},

'Core-Passion-Open-Free-Drive':{
d:'A creator whose passion burns to build something entirely their own',
s:"You combine deep feeling with relentless drive to create — and what you create comes from somewhere most people can't access. Your work has a quality of emotional authenticity that isn't teachable. You also have the stubbornness to see things through when others would stop, because for you, this isn't just a project. It's an expression of who you are.",
w:"The intensity of your investment in your work means that criticism lands differently for you than for others — it feels like an attack on your identity, not your output. You can also be so absorbed in your creative vision that you lose track of relationships, health, and practical realities until something forces you back.",
b:'Pouring everything into creation, refusing to compromise the vision',
c:'"I\'ll do it my way or not at all."',
q:'"This is the only way I know how to do it."',
soul:"You were born to make something that didn't exist before you made it. This isn't ambition — it's compulsion. The work chooses you as much as you choose it. What makes your path hard is that you can't do it any other way: you can't create by committee, you can't compromise your vision for approval, you can't produce on demand what only emerges when it's ready. The world doesn't always reward this. But the work itself — when it finally exists — makes everything make sense.",
daily:"You forget to eat when you're deep in a project. You have notebooks full of ideas at various stages of development. You find inspiration in unexpected places and lose it in the moment you try to force it. You work in bursts of intense focus separated by periods of apparent idleness that are actually essential to the process.",
relations:"You need a partner who understands that your dedication to your work is not a rejection of them — it's the same love, pointed at something that isn't you. The relationships that sustain you are ones where you can be seen in full — obsessive, difficult, brilliant, exhausted — and loved anyway.",
careers:[{job:'Independent Artist / Filmmaker',why:"The freedom to pursue your vision without compromise is not a luxury for you — it's a precondition of doing your best work."},{job:'Designer / Architect',why:"Environments where craft and vision are respected allow your particular combination of feeling and drive to produce extraordinary results."},{job:'Entrepreneur in Creative Fields',why:"Building something entirely your own, on your own terms, satisfies both your creative need and your drive to bring something new into the world."}]},

'Core-Passion-Open-Order-Flow':{
d:'The gentle healer — feeling deeply, supporting quietly, restoring calm',
s:"Your combination of deep empathy and quiet reliability is extraordinarily rare. You don't just feel what others feel — you do something about it in a steady, sustainable way. People around you feel genuinely cared for without feeling overwhelmed or obligated. You create safety without drama.",
w:"You absorb others' emotions so readily that you can lose track of your own. The line between 'I'm sad' and 'someone near me is sad' blurs. You can give so much that you arrive at empty without warning. Learning to receive care — not just give it — is the central work of your life.",
b:'Creating quiet spaces where people feel safe to be exactly as they are',
c:'"You don\'t have to be okay. You\'re okay with me."',
q:'"What do you need right now?"',
soul:"Your soul is oriented toward restoration — yours is the gift of making people feel like themselves again after they've gotten lost. You don't need to be dramatic or impressive; your presence itself is the medicine. But every healer needs healing, and the self-care you practice on others you rarely offer yourself. The most important relationship shift you'll ever make is learning that your needs are as valid as anyone else's — and then actually acting on that.",
daily:"You notice when someone is slightly off before they say anything. You bring food when people are stressed without being asked. You create environments that feel safe and calm. You process things deeply and don't rush to reactions. You forget to eat when you're helping someone else.",
relations:"You are the person everyone wants to call when things fall apart — which is an honor and a burden. Your challenge is building relationships that are genuinely reciprocal, where you can also fall apart occasionally and know you'll be caught.",
careers:[{job:'Nurse / Therapist / Social Worker',why:"Your innate capacity to hold space and your steady reliability under emotional pressure make you exceptional in care-oriented roles."},{job:'Teacher / Facilitator',why:"You create the kind of environment where people feel safe to grow. That's the foundation of everything effective in education."},{job:'Community Organizer / Pastoral Worker',why:"Your ability to make diverse groups feel genuinely cared for and included is a rare organizational gift."}]},

'Core-Passion-Open-Order-Drive':{
d:'A passionate builder — feeling deeply and building sustainably toward what matters',
s:"You build things that last because they're built on something real: genuine care for the people they serve. You have the emotional depth to understand what actually matters and the discipline to execute it over time. This combination produces work and relationships of unusual quality.",
w:"Your perfectionism in domains you care about can slow you down and frustrate collaborators. You set standards that others can't always match, and you can struggle to delegate because you're not sure others care as much as you do. Sometimes they don't. But sometimes they just care differently.",
b:'Building something meaningful with patience, precision, and genuine care for the people involved',
c:'"Do it right, or don\'t do it."',
q:'"This matters too much to rush."',
soul:"You are building a life, not just achieving outcomes — and that's a more complex and more valuable project than most people undertake. The challenge is patience: with yourself, with the process, with the people who can't yet see what you're building. Your deep care for getting things right is your strength. Your tendency to make that standard the only acceptable one is where it becomes costly.",
daily:"You plan thoughtfully but leave room for what matters to emerge. You follow through on things that most people forget. You have strong standards for your own work that you don't always expect from others. You care genuinely about the people in your environment and show it through action more than words.",
relations:"You build relationships with the same care you bring to everything else — slowly, deliberately, durably. The people who make it into your inner circle know they're there for good. Your challenge is letting people in before they've fully proven themselves — trusting process as much as outcome.",
careers:[{job:'Architect / Product Designer',why:"Creating things that are both beautiful and functional, built to last — your natural operating mode."},{job:'Program Director / Nonprofit Leader',why:"Building organizations oriented toward genuine impact, with the discipline to execute and the heart to sustain it."},{job:'Writer / Documentary Filmmaker',why:"Creating work that reveals true things about human experience, with craft and patience — this rewards your particular combination."}]},

'Core-Passion-Veiled-Free-Flow':{
d:'A drifter — feeling everything, rooted nowhere, searching for something nameless',
s:"You carry a quality of authentic mystery that people find magnetic. You're not performing depth — you have it. Your genuine openness to all of life's strangeness, combined with your refusal to pretend certainty you don't feel, makes you one of the most honest people anyone will ever meet.",
w:"Without anchors, even genuine freedom becomes exhausting. You may find yourself drifting through experiences and connections without accumulating anything — wisdom, relationship depth, professional progress — in a sustainable way. The freedom you protect can become isolation if you're not careful.",
b:'Moving through the world with genuine curiosity, touching everything lightly, belonging nowhere completely',
c:'"I\'ll know it when I find it."',
q:'"I\'m not sure — but I\'m curious."',
soul:"Your soul is genuinely searching for something — and the courage required to keep searching without pretending you've found it is more than most people possess. You are genuinely free in a way that most people only perform. The question isn't whether you're living authentically; it's whether authentic living is leading you somewhere, or whether freedom has become a way of avoiding the vulnerability of commitment.",
daily:"You move through phases of deep immersion in whatever currently captures you. You're better at beginnings than middles. You form connections quickly and meaningfully, but not always durably. You're genuinely interesting to spend time with. You're also genuinely difficult to hold.",
relations:"You need relationships that can accommodate impermanence and intensity in equal measure — people who can be fully present with you without needing a guarantee of forever. These relationships exist. Finding them requires you to be as honest about your nature as you are about everything else.",
careers:[{job:'Freelance Creative / Artist',why:"Freedom of movement, freedom of expression, freedom to follow whatever genuinely interests you — this is the only environment that works for you long-term."},{job:'Travel Writer / Documentary Journalist',why:"Your genuine curiosity about how different people live and what they believe makes you a natural chronicler of human experience."},{job:'Researcher / Independent Scholar',why:"Following questions wherever they lead, without institutional constraint, suits your particular kind of intelligence."}]},

'Core-Passion-Veiled-Free-Drive':{
d:'An abyss walker — driven by deep feeling toward destinations others can\'t imagine',
s:"You are motivated by things that most people never encounter in themselves — a profound restlessness, an ache for meaning that ordinary achievement doesn't satisfy, a drive to go further than is comfortable or sensible. This makes you capable of extraordinary things, because you're willing to go where most people turn back.",
w:"The same depth that drives you can pull you under. Without structure or grounding, your intensity can turn inward destructively. You can become lost in your own complexity, mistaking suffering for depth and mistaking people who are simply lighter for being shallow.",
b:'Going to the absolute depths of whatever experience or understanding you're pursuing',
c:'"I\'d rather feel everything than feel nothing."',
q:'"There has to be more than this."',
soul:"You are one of the few people alive who takes the question of existence seriously enough to actually live by your answer, whatever the cost. That's a form of courage most people never develop. The risk is losing yourself in the search — mistaking the descent for the destination. The goal is not the abyss. The goal is what you bring back from it.",
daily:"You read things that disturb you because you'd rather be disturbed and understand than comfortable and ignorant. You have long, difficult internal conversations with yourself. Your relationship with your own emotions is more complex than most people's relationship with all of theirs combined.",
relations:"You need people who can go deep with you without getting lost there. The relationships that matter to you are among the most profound anyone will experience — because you bring everything and expect the same. Your challenge is not closing off entirely when you don't find that immediately.",
careers:[{job:'Depth Psychologist / Research Therapist',why:"Your natural comfort with complexity and the dark places of human experience gives you access in therapeutic work that lighter practitioners can't reach."},{job:'Novelist / Poet / Philosopher',why:"The questions you live with are the material of the most enduring creative and intellectual work."},{job:'Crisis Counselor / Emergency Humanitarian',why:"Your ability to remain present and functional in the most difficult human situations is an extraordinary and needed gift."}]},

'Core-Passion-Veiled-Order-Flow':{
d:'The shadow poet — intense inner life contained within a composed exterior',
s:"The combination of deep feeling and extraordinary discipline gives your presence and work a quality of compressed intensity — everything contained, nothing wasted. People experience you as quietly powerful without being able to say exactly why. Your inner landscape is rich beyond what your exterior suggests.",
w:"The compression eventually needs release. If you maintain your composed exterior past the point where it's sustainable, the release when it comes can be disproportionate and confusing to everyone, including you. Your discipline is a strength — but it works best as a choice, not a compulsion.",
b:'Channeling deep feeling into form — structure, craft, precise expression',
c:'"Discipline is how I honor what I feel."',
q:'"I need to think about that."',
soul:"You have learned to build cathedrals out of your feelings rather than letting them flood the plain. The craft you've developed — whether in art, words, work, or relationships — is the direct product of learning to shape intensity into form. What you're still learning is that not everything needs to be shaped. Some feelings are allowed to just be what they are.",
daily:"You are more moved than you show. You process deeply before responding. Your environment reflects careful curation — nothing accidental. You are punctual, prepared, and privately overwhelmed more often than anyone suspects.",
relations:"The people who know you well are your greatest treasure and your greatest vulnerability. You are intensely loyal once you let someone in. Your challenge is letting people in before you've processed them completely — which could take a very long time.",
careers:[{job:'Editor / Curator',why:"Shaping others' raw material into refined form is both intellectually satisfying and emotionally rich for you."},{job:'Composer / Choreographer',why:"Creating structured forms that express emotional truth — this is exactly what you are built for."},{job:'Clinical Researcher / Documentarian',why:"The combination of systematic method and genuine human engagement makes you exceptional at work that bridges data and story."}]},

'Core-Passion-Veiled-Order-Drive':{
d:'A masked conductor — orchestrating outcomes through hidden feeling and visible discipline',
s:"You lead by example in a way that's impossible to fake: your own standards are visibly higher than those you impose on others. You feel deeply and act strategically — a combination that produces leadership others find both inspiring and slightly intimidating.",
w:"The mask becomes heavier over time. The energy required to maintain composed authority while experiencing the full range of emotion underneath is enormous. You may not notice the toll until you're already running on empty. The people closest to you can see the effort even when others can't.",
b:'Leading with visible discipline while allowing deep feeling to inform (but not control) your decisions',
c:'"The feeling informs the strategy. The strategy executes."',
q:'"I know what needs to happen."',
soul:"You have accomplished something genuinely difficult: you've learned to harness your emotional depth as fuel for structured achievement rather than letting it derail you. This makes you effective in ways most emotionally intense people never achieve. What you're still working on is the difference between harnessing your feelings and suppressing them — because only one of those is sustainable.",
daily:"You arrive prepared. You notice everything and comment on very little. You give people one clear chance and then adjust accordingly. You are harder on yourself than on anyone else. You bring the same intensity to everything you care about.",
relations:"Relationships with you are earned through demonstrated alignment with what matters to you. Once earned, your loyalty is absolute. Your challenge is letting people matter to you before they've proven themselves — because that's when love begins, not after.",
careers:[{job:'Executive Director / Program Officer',why:"Strategic vision informed by genuine care for impact — you have the rare combination that makes organizations actually work."},{job:'Conductor / Director',why:"Holding the vision and bringing others into it through your own embodied discipline is your natural leadership style."},{job:'Senior Researcher / Principal Investigator',why:"Driving long-term projects with both intellectual rigor and emotional investment in the outcome produces your best work."}]},

'Social-Logic-Open-Free-Flow':{
d:'A free thinker who moves between worlds with ease and leaves everyone feeling smarter',
s:"You make complexity accessible without making it shallow. Your combination of genuine intellectual curiosity and natural social ease means you can have the same quality conversation with a Nobel laureate and a first-grader. You're also genuinely interested in both, which is the part that can't be faked.",
w:"Your breadth can work against depth. Moving fluidly between contexts and ideas is wonderful until someone needs you to stay in one place long enough to build something lasting. You can also find it hard to commit to positions you're not entirely certain about — which is most positions.",
b:'Moving freely between ideas, people, and contexts, finding the unexpected connections',
c:'"Everything is connected if you look at it the right way."',
q:'"That reminds me of something completely different..."',
soul:"Your mind is one of the most free-ranging instruments available in the human toolkit. The joy you get from discovering unexpected connections between ideas — from finding the deep structure beneath wildly different surfaces — is one of the most genuine pleasures available to an intelligent person. Your challenge is channeling this gift in a way that creates lasting value, not just endless fascinating conversation.",
daily:"You read widely and make connections that surprise people. You're the person who knows something useful about almost every topic that comes up. You make friends wherever you go. You sometimes frustrate people by being genuinely undecided about things they expect you to have a position on.",
relations:"You're easy to like and hard to truly know — not because you're hidden, but because you're genuinely in motion. The relationships that stick are the ones built on shared intellectual adventure.",
careers:[{job:'Journalist / Essayist',why:"Covering the full range of human experience with genuine curiosity and the ability to make it meaningful for a broad audience."},{job:'Educator / Professor',why:"Your genuine delight in ideas and ability to communicate them across levels of understanding make you a remarkable teacher."},{job:'Startup Generalist / Innovation Consultant',why:"Environments that reward breadth, flexibility, and the ability to find novel solutions to novel problems."}]},

'Social-Logic-Open-Free-Drive':{
d:'An adventurer — energized by the new, driven to go further, impossible to slow down',
s:"You have a rare combination of genuine curiosity about the world and the drive to actually experience it rather than just think about it. You charge toward the unfamiliar with a confidence that inspires others and an openness that means you almost always find something worth finding.",
w:"Your speed and forward momentum make you a brilliant beginner and an unreliable finisher. You launch more projects than you complete. You form connections faster than you can maintain them. The breadth of your life is extraordinary; the depth takes deliberate cultivation.",
b:'Diving into new experiences, new places, new people with full commitment and fresh eyes',
c:'"The only mistake is not trying."',
q:'"What\'s next?"',
soul:"You are most alive at the frontier — of ideas, experiences, places, relationships. This is your greatest gift and it is not small. The question that matters is what to do with all that aliveness. The experiences accumulate. The question is whether you're gathering them or building with them.",
daily:"You have passport stamps from places most people haven't heard of. You've tried things most people haven't considered. You're the first to show up for something new. You can be genuinely difficult to keep up with.",
relations:"You love connecting with people and are genuinely interested in everyone you meet — which can feel like intimacy but doesn't always become it. The relationships that matter to you are the ones with people who can travel alongside you at your actual pace.",
careers:[{job:'Entrepreneur / Explorer',why:"Building new things in new territories — literally or figuratively — is where you do your best work."},{job:'International Development / Adventure Guide',why:"Environments that combine genuine challenge, meaningful purpose, and constant novelty bring out your best."},{job:'Venture Capitalist / Innovation Scout',why:"Finding what's next before others see it is both your skill and your passion."}]},

'Social-Logic-Open-Order-Flow':{
d:'A mediator — holding the middle, keeping the whole, making peace feel like progress',
s:"You have an extraordinary ability to hold multiple perspectives simultaneously without being personally destabilized by any of them. This makes you genuinely effective at mediation, consensus-building, and creating environments where different kinds of people can actually work together.",
w:"Your strength in holding the center can become a failure to take positions. There are moments when the most helpful thing you could do is simply declare a side — and you can find this genuinely difficult. People sometimes need a guide, not a mirror.",
b:'Finding the workable synthesis between positions everyone else thinks are incompatible',
c:'"There\'s a way through this. Let\'s find it."',
q:'"I think you\'re both seeing part of it."',
soul:"Your soul is oriented toward wholeness — bringing together what has been split, finding the underlying unity beneath surface conflict. This is a profound orientation to have. The challenge is using it actively rather than just holding the tension. Real mediation requires taking risks, making calls, and sometimes being wrong.",
daily:"You are the person people call when relationships need mending or groups need realigning. You have an instinct for the right process even when you don't know the right outcome. You are patient with complexity and difficult to rattle.",
relations:"You are deeply trustworthy and genuinely good at keeping relationships functional. Your challenge is distinguishing between keeping peace and tolerating things that should be addressed. You deserve relationships that are genuinely reciprocal, not just stable.",
careers:[{job:'Mediator / Diplomat / HR Leader',why:"Your natural ability to hold multiple perspectives and facilitate genuine understanding is your professional superpower."},{job:'Community Manager / Organizational Developer',why:"Building environments where diverse people can thrive together requires exactly your combination of skills."},{job:'Therapist / Family Counselor',why:"Helping people find their way back to each other is work your temperament and skills are built for."}]},

'Social-Logic-Open-Order-Drive':{
d:'The commander — clear-eyed, systematic, and entirely sure of the destination',
s:"You combine strategic clarity with genuine interpersonal skill — which means you can both determine the right direction and actually get people moving in it. This is genuinely rare. Most strategists can't sell their strategy; most charismatic leaders can't build one. You can do both.",
w:"Your certainty can outrun the evidence, and your drive can leave your team behind. You set the pace based on what's possible for you, which isn't always possible for everyone. People follow you — but they sometimes do it afraid rather than inspired.",
b:'Setting the direction, building the system, holding people accountable to shared standards',
c:'"Here\'s where we\'re going and why."',
q:'"What\'s the plan?"',
soul:"You were built for the front — for leading in conditions of genuine uncertainty where someone has to decide and move. The question isn't whether you can do this; clearly you can. The question is what kind of leader you want to be — one who produces results through fear and clarity of direction, or one who produces results through genuine shared purpose. The second is harder and more durable.",
daily:"You are already thinking about tomorrow's problems. You run tight, effective meetings. You hold yourself to the same standards you hold others. You find it difficult to slow down even when the situation calls for it.",
relations:"You attract people who want to be led and sometimes scare away people who want to be partners. The relationships that serve you best are with people who will push back when you're wrong and stay when you're difficult — people who aren't afraid of you.",
careers:[{job:'CEO / Military Commander / Head Coach',why:"You are built for leadership in high-stakes environments that require both strategic clarity and the ability to bring people along."},{job:'Founder / Managing Director',why:"Building and running organizations is where your particular combination of drive, clarity, and interpersonal skill creates maximum value."},{job:'Policy Leader / Chief of Staff',why:"Translating strategic vision into executable organizational reality is your natural domain."}]},

'Social-Logic-Veiled-Free-Flow':{
d:'A social fox — charming, perceptive, always holding more cards than you show',
s:"Your social intelligence is extraordinary. You can move through any environment, read any room, and calibrate your approach to any person — all while appearing completely natural and at ease. People enjoy your company without ever quite knowing what you're thinking.",
w:"The distance between your social presentation and your inner life can become a permanent feature rather than a strategic choice. After years of managing impressions, you may find yourself genuinely unsure what you actually feel versus what you've decided it's useful to appear to feel.",
b:'Navigating complex social environments with ease, always knowing more than you reveal',
c:'"The most interesting things happen when people think they\'re the only one watching."',
q:'"How interesting."',
soul:"You have learned to make your social navigation look effortless — and it is, at the level of execution. What it costs you at the level of intimacy is harder to see until much later. The connections you've made with your social competence are real. What you're still discovering is that a different kind of connection — one that doesn't require competence — is possible, and worth pursuing.",
daily:"You adapt your communication style to each person without thinking about it. You notice social dynamics others miss. You're rarely if ever caught off guard in social situations. You have a few very different sets of friends who have no idea the others exist.",
relations:"You are genuinely delightful to know — but people who get close sometimes feel they're getting a version rather than the original. The people worth pursuing are the ones who make you feel safe enough to show them the unedited version.",
careers:[{job:'Diplomat / Negotiator',why:"Your ability to read rooms and people while managing your own presentation is the core skill of high-stakes negotiation."},{job:'Communications Director / Brand Strategist',why:"Understanding how people perceive things and why, and shaping those perceptions strategically — this is your natural skill set."},{job:'Journalist / Intelligence Analyst',why:"Gathering information, reading sources, and synthesizing patterns — your perceptiveness and social navigation give you access others don't have."}]},

'Social-Logic-Veiled-Free-Drive':{
d:'A tactician — always thinking five moves ahead and smiling while they do it',
s:"Your ability to pursue long-term strategic goals through social environments without revealing your process is extraordinary. You combine genuine warmth and interpersonal skill with a strategic intelligence that operates underneath the surface. This makes you effective in ways that are nearly invisible until the outcome appears.",
w:"The more sophisticated your strategy, the more isolated you can become — because genuine connection requires dropping the strategy occasionally. If you're always thinking, you're never quite present. And people who are very present can feel the absence of yours.",
b:'Pursuing complex goals through social navigation while keeping the strategy entirely invisible',
c:'"Everyone thinks they know what I\'m doing."',
q:'"That\'s very interesting. Tell me more."',
soul:"You are playing a more complex game than most people around you, and you're good at it. What you're working toward is real and the path you're taking to get there is genuinely intelligent. The question worth asking: is the strategic mode a tool you use when needed, or has it become the only mode available to you? Genuine surprise, genuine vulnerability, genuine 'I don't know what happens next' — these are not weaknesses. They're the places where real growth happens.",
daily:"You are always gathering information. Your conversations are genuinely enjoyable while also being purposeful. You remember details about people that become useful much later. You have long-term projects that you've mentioned to very few people.",
relations:"You form alliances more easily than friendships — but the alliances can be extraordinarily durable. The people who become genuinely close to you are the ones who figured out what you were doing and liked you anyway.",
careers:[{job:'Political Operative / Campaign Manager',why:"Your combination of strategic intelligence, social navigation, and long-range thinking is exactly what complex political environments require."},{job:'Senior Advisor / Executive Coach',why:"Helping leaders navigate complex organizational and interpersonal environments is your natural function."},{job:'Entrepreneur / Deal Maker',why:"Finding value in complex situations and navigating the human systems required to capture it — this is where you operate best."}]},

'Social-Logic-Veiled-Order-Drive':{
d:'The iron diplomat — everything ordered, nothing revealed, everything moving',
s:"Your combination of social grace, strategic discipline, and relentless drive to execute makes you one of the most formidable operators in any professional environment. You never let the process show. The outcome simply appears, on time, as specified.",
w:"The control required to operate this way is enormous and invisible, which means its costs are also invisible until they're not. You may not notice how much energy you're spending maintaining composure and forward momentum until you have nothing left.",
b:'Executing complex social and organizational strategies with complete composure',
c:'"Composure is a strategy."',
q:'"Let me handle this."',
soul:"You've built a version of yourself that functions at an extraordinarily high level in demanding environments. That's an achievement. What the version you've built is still learning: how to receive, how to rest, how to be inefficient in ways that are actually regenerative. The machine is impressive. What's underneath it is worth protecting.",
daily:"You are always composed, always prepared, always executing. The amount of internal effort required to maintain this is something you underreport even to yourself.",
relations:"Your relationships tend toward the functional and the loyal — people who appreciate your reliability and your discretion. The challenge is building relationships that can hold your actual complexity, not just your polished surface.",
careers:[{job:'Chief of Staff / Senior Operations Executive',why:"You run things — quietly, effectively, at scale. This is your natural domain."},{job:'Diplomat / Senior Negotiator',why:"High-stakes environments requiring composure, strategy, and social precision are where you're most effective."},{job:'Founding COO / Institutional Leader',why:"Building and running durable institutions requires your particular combination of strategic clarity and operational discipline."}]},

'Social-Passion-Open-Free-Flow':{
d:'A radiant presence — emotionally open, freely giving, and lighting up every room',
s:"You change the atmosphere of a room just by being in it. The tension in people's shoulders releases. Quiet people start talking. Heavy air becomes light. This isn't performance — it's the natural effect of your presence. Your extraordinary approachability and genuine emotional expression are increasingly rare and genuinely valuable.",
w:"The 'always bright' label is both a gift and a cage. You may feel pressure to perform cheerfulness even when you're genuinely struggling — because your sadness surprises and unsettles the people who rely on your light. The hardest thing you'll ever do is let someone see you in the dark.",
b:'Being the presence that makes the room feel like it\'s okay to be human',
c:'"Enjoy it. That\'s the whole point."',
q:'"That\'s so fun, right?!"',
soul:"Your soul is sunlight — genuinely. But even the sun has a dark side. The brightness you bring to others is real and it matters. What's also real is the loneliness of always being the one who brings light rather than the one who gets to receive it. The people who will change your life are the ones who insist on caring for you even when — especially when — you're not performing.",
daily:"You are the first to laugh and the last to leave. You make strangers feel like old friends. You can't stand being alone for too long. On the rare occasions when you are genuinely sad and alone, you feel the depth of that contrast very sharply.",
relations:"You are extraordinarily easy to like and sometimes surprisingly hard to know — not because you're hiding but because your light makes it hard for others to see that you have a shadow. The relationships that matter most are the ones where your shadow is also welcome.",
careers:[{job:'Entertainer / Performer / Host',why:"Your natural ability to create genuine warmth and aliveness in groups is your professional gift."},{job:'Early Childhood Educator / Youth Worker',why:"The environment you naturally create is the one children thrive in most."},{job:'Event Producer / Community Builder',why:"Creating spaces where people feel genuinely welcome and alive — this is what you do, and it can be your work."}]},

'Social-Passion-Open-Free-Drive':{
d:'A firestarter — igniting movements through passion that simply can\'t be contained',
s:"Your passion is contagious in the most literal sense — it spreads to everyone in your proximity and changes what they believe is possible. Combined with your natural drive and social fluency, you have the ability to start movements, not just join them.",
w:"You burn bright and sometimes burn out. Your passion launches things at a pace that can't be sustained, and the projects you don't complete leave real costs behind — to you, to collaborators, to the people who believed in you. Learning to tend the fire rather than feed it is your central challenge.",
b:'Igniting something new, gathering people around it, and getting it moving',
c:'"This is going to change everything."',
q:'"You have to hear about this."',
soul:"Your soul is on fire with a genuine mission — and that mission is real and it matters. What's also real is that fires need fuel and air and careful tending, not just the initial spark. The leaders who change things are the ones who stay with them through the hard middle, when the fire is just embers and the people who joined for the excitement have moved on. That's where your work is now.",
daily:"You wake up already thinking about what's possible. You find the resistance to your ideas personally confusing — how can people not see this? You have more ideas than you can pursue and more energy than you can direct, which creates a particular kind of creative frustration.",
relations:"You attract people who want to be ignited and sometimes scare away people who want to be partners. The relationship you need is with someone who matches your passion without matching your impatience — someone who will stay with you through the quiet parts.",
careers:[{job:'Social Entrepreneur / Activist',why:"Your passion and ability to mobilize people around a cause makes you one of the most effective forces for change available."},{job:'Creative Director / Brand Visionary',why:"Infusing organizations with genuine purpose and energy — this is exactly what you do."},{job:'Keynote Speaker / Movement Builder',why:"Communicating transformative ideas to large groups in ways that actually change behavior — this is your natural domain."}]},

'Social-Passion-Open-Order-Flow':{
d:'The empath — feeling everyone, supporting everyone, quietly holding the whole together',
s:"Your empathy is near-supernatural in its accuracy — you read emotional states before they're spoken and translate that reading into concrete, practical support. You don't just feel with people; you do something about it in a steady, organized way. This makes you the most reliable support structure in any group you're part of.",
w:"You absorb others' emotional states so readily that you can lose the ability to distinguish your own. You can also give so much that you arrive at empty without warning — and because you're so good at functioning even when depleted, no one notices until you stop functioning entirely.",
b:'Feeling what others need and providing it steadily, without drama, without keeping score',
c:'"You\'re not alone in this."',
q:'"Are you doing okay?"',
soul:"Your soul is oriented toward healing — not in a dramatic sense, but in the quiet, steady sense of being the person who makes sure everyone has what they need and no one falls through the cracks. This is an extraordinary orientation to have, and the world runs better because of people like you. What you're still learning: you are also someone who needs to be caught. And you deserve to let that happen.",
daily:"You are aware of everyone's emotional state and adjust accordingly. You bring things to people before they know they need them. You remember the small things. You forget to eat when you're helping someone. You underreport how tired you are.",
relations:"You are the first person most people call when things fall apart — which is an honor that comes with real costs. Your challenge is building relationships where you can also fall apart, and where the support is genuinely reciprocal.",
careers:[{job:'Social Worker / Counselor / Nurse',why:"Your combination of accurate empathy and practical follow-through makes you exceptional in care-oriented roles."},{job:'School Counselor / Student Affairs',why:"Creating environments where young people feel genuinely seen and supported is exactly what you do naturally."},{job:'Team Coach / HR Partner',why:"Your ability to read group emotional dynamics and respond practically makes you invaluable in team-focused organizational roles."}]},

'Social-Passion-Open-Order-Drive':{
d:'A passionate leader — moving people through genuine feeling and disciplined execution',
s:"You have what most leaders lack: the combination of genuine passion for what you're building, real care for the people building it, and the discipline to execute it over time. People follow you because you mean it, and you demonstrate that you mean it through consistent action.",
w:"Your emotional investment in outcomes makes it difficult to separate the work from yourself — which means setbacks feel personal and criticism feels like rejection. You also set standards based on how much you care, which can be more than others are able to match.",
b:'Building something genuinely meaningful through the combination of passion, care, and discipline',
c:'"Heart and discipline. Together."',
q:'"We can do this. I believe in us."',
soul:"Your leadership emerges from genuine love — for the work, for the mission, for the people you're doing it with. That's rare and it's powerful. What you're still working on: the equanimity to hold the mission steady when things fall apart, when people disappoint you, when the gap between vision and reality is temporarily very large. You have the love. Now you're developing the spaciousness.",
daily:"You are deeply invested in the work and in the people doing it. You follow up. You notice when someone is off and address it. You hold yourself to the highest standard and struggle not to extend that to everyone around you.",
relations:"The relationships you form around shared purpose are among the most powerful bonds available to humans. Your challenge is building relationships that don't depend on shared purpose — ones that are simply about who you are to each other.",
careers:[{job:'Team Leader / Program Director',why:"Leading people through genuine purpose and the combination of heart and discipline — you are the most natural version of this role."},{job:'Social Impact Founder / NGO Director',why:"Organizations that exist to make something genuinely better need the kind of leadership you provide — passionate, disciplined, and human."},{job:'Coach / Educator',why:"Developing people through genuine investment in their growth, sustained over time — this is where your particular combination creates the most lasting value."}]},

'Social-Passion-Veiled-Free-Flow':{
d:'The trickster — making the room laugh while quietly feeling everything',
s:"You have an extraordinary gift for reading what a moment needs and providing exactly that — usually in the form of the perfectly timed observation, the joke that releases the tension, the lightness that lets people breathe. This is not performance. It is genuine perceptiveness expressed through humor.",
w:"The 'funny one' role is both your power and your prison. You've learned to reach for humor when things are difficult — including when what's needed is for you to be serious, vulnerable, or simply present without the performance. The mask of the jester is more comfortable than you know.",
b:'Finding the humor in everything as a way of both connecting and — occasionally — protecting yourself from feeling too much',
c:'"Don\'t take anything too seriously. Including yourself."',
q:'"Come on, it\'s not that bad."',
soul:"Beneath the jokes is a person who feels everything deeply and has learned to metabolize it through humor. This is genuine wisdom — comedy has always been the sharpest tool for surviving reality. What you're still working on is the courage to be present without the performance — to let people see the person who lives behind the jokes, who is just as interesting and far more vulnerable than the persona they've come to depend on.",
daily:"You notice the absurd in everything. You're always half-composing the next observation. You can make any situation lighter, which is a gift. You're also someone who sometimes uses that gift to avoid sitting with difficulty.",
relations:"You are one of the most enjoyable people to know. The relationships that matter most are the ones where you're allowed to not be funny — where your sadness and your complexity and your genuine questions are as welcome as your punchlines.",
careers:[{job:'Comedian / Writer / Performer',why:"Your genuine perceptiveness about human nature combined with your gift for expression is the foundation of the best creative work."},{job:'Therapist / Youth Counselor',why:"The ability to create levity in serious situations without dismissing them is a rare therapeutic skill."},{job:'Brand Creative / Content Creator',why:"Finding the truth in everyday experience and making it resonate with a wide audience — this is what you do naturally."}]},

'Social-Passion-Veiled-Free-Drive':{
d:'The charisma — magnetically drawing people in while remaining genuinely mysterious',
s:"Your presence is felt before your words are heard. You command attention without demanding it and influence people without coercing them. This combination of genuine magnetism, emotional intelligence, and hidden drive makes you one of the most powerful social forces available.",
w:"Your greatest vulnerability is that the people around you know your persona very well and your actual self barely at all. This is partly protective, but it's also deeply lonely — and it means that the admiration and loyalty you receive is for someone who is partly a performance, which can leave you feeling unseen even in a crowd.",
b:'Drawing people toward you through presence and genuine mystery while pursuing your own vision',
c:'"Come closer — but not too close."',
q:'"You\'ll understand when it\'s time."',
soul:"Your charisma is real — it emerges from genuine depth, genuine complexity, genuine fire. What it costs is genuine connection, because the persona that magnetizes people also keeps them at exactly the distance required for the magnetism to work. The people who will change your life are the ones who see through the magnetism entirely and want to know what's underneath it. Let them.",
daily:"You command rooms without trying. You're always aware of how you're being perceived. You have a carefully curated external presence that requires real maintenance. Privately, you're far more uncertain and searching than anyone would guess.",
relations:"Your relationships tend to be with people who are drawn to your charisma rather than people who've penetrated it. The relationships worth pursuing are the ones that develop in the direction of genuine mutual knowledge — which requires you to be willing to be ordinary with someone.",
careers:[{job:'Founder / Public Figure',why:"Your natural authority and magnetism, combined with your drive to realize a vision, makes you effective in roles that require both leadership and presence."},{job:'Creative Director / Brand Architect',why:"Creating and inhabiting a vision in a way that draws others in — this is your natural mode."},{job:'Performer / Speaker',why:"Using genuine presence to move audiences toward something real — this is a form of leadership that suits your particular combination."}]},

'Social-Passion-Veiled-Order-Flow':{
d:'The performer — disciplined, expressive, and extraordinarily effective in the spotlight',
s:"Your combination of expressive power and structural discipline makes you one of the most effective presences in any performance-oriented context. You bring genuine emotion to forms that hold it — which is what separates memorable performance from merely competent execution.",
w:"The applause can become necessary in a way that's hard to distinguish from love. You may find yourself measuring your worth in audience response and struggling to find value in the quiet, unwitnessed moments of life that don't perform for anyone.",
b:'Bringing full emotional presence to structured performance and creating genuine experiences for others',
c:'"The stage is where I\'m most myself."',
q:'"How did it land?"',
soul:"What you give when you perform is real — your actual self, shaped by craft into something others can receive. This is a genuine gift and it requires genuine courage. What you're still learning is that the self that performs is not your whole self, and the moments of life that don't have an audience are also real, and also worth inhabiting fully.",
daily:"You are always aware of how the current performance is landing. You prepare exhaustively for public moments and experience genuine relief when they go well. You have a rich inner life that the performance doesn't fully reveal.",
relations:"The relationships that matter most to you are the ones with people who knew you before the performance — or who figured out how to look through it. These are the relationships worth investing in.",
careers:[{job:'Performer / Director',why:"Creating and inhabiting great work in front of an audience — this is the environment where your particular combination operates at full power."},{job:'Teacher / Public Educator',why:"Performing knowledge and perspective in a way that genuinely reaches and moves students — your presence is your pedagogy."},{job:'Event Creator / Ceremony Designer',why:"Designing experiences that move people emotionally through carefully structured progression — this combines your expressive and organizational gifts."}]},

'Social-Passion-Veiled-Order-Drive':{
d:'The masked sun — leading through controlled brilliance toward transformation',
s:"You have the ability to inspire and organize simultaneously — to move people emotionally while also directing them precisely. This combination produces results that neither emotional inspiration alone nor disciplined management alone can achieve. You lead through presence and hold through structure.",
w:"The control required to lead this way at high intensity over time is enormous. You are spending more energy than you're accounting for. The mask of relentless effective leadership eventually needs to come down — and learning to do that intentionally, before crisis forces it, is your central developmental challenge.",
b:'Inspiring through controlled brilliance while building structures that outlast the inspiration',
c:'"I\'ll show you by doing it."',
q:'"Watch what\'s possible."',
soul:"You are one of the most capable human beings available — a person who can genuinely inspire and also genuinely build, who feels deeply and acts strategically, who leads from the front and holds the structure behind. What you're still working on is sustainability — learning to protect the source of all that capability, which is you, the actual person underneath the mission. That person is as important as everything you're building.",
daily:"You are always performing at a high level, always building toward something, always holding more than you show. The energy this requires is not sustainable at the pace you're going. The question you're not asking yourself often enough: what do I actually need right now?",
relations:"You form relationships through shared purpose and mutual respect for what the other person is building. The relationships worth pursuing are the ones that can hold both your power and your limits — the ones where you don't have to always be the masked sun.",
careers:[{job:'Transformational Leader / CEO',why:"You combine the ability to inspire with the ability to build — which is what transformational leadership actually requires."},{job:'Movement Founder / Social Architect',why:"Building organizations and movements that outlast your direct involvement by creating genuine culture and shared purpose."},{job:'High-Performance Coach / Elite Educator',why:"Developing other people toward their highest expression through the combination of inspiration and precise structure is your natural leadership mode."}]}
};

// ============================================================
// UI TEXT IN ENGLISH
// ============================================================
const DIAG_UI_EN={
analyzingSteps:[
  'Calculating 15-dimensional P variables...',
  'Determining 5 core axes...',
  'Detecting contradiction fingerprints...',
  'Analyzing relational dynamics...',
  'Matching against 32 types...',
  'Rendering your unique pattern...'
],
breakLabel_suffix:' Complete',
sectionLabels:{
  soul:'Soul Blueprint',
  daily:'Daily Life',
  relations:'Relationship Style',
  careers:'Careers',
  strength:'Strengths',
  weakness:'Weaknesses',
  contradiction:'Inner Contradictions'
},
contradictionLabels:{
  P1:{name:'Social Mask',hi:'Heavy mask',lo:'Authentic self',
    lg:"You project a perfect social persona — but inside, there's a completely different person. Your surroundings may not realize the gap.",
    md:"In social settings, do you sometimes catch yourself oscillating between 'the real me' and 'the me I perform'?",
    sm:"Occasionally you may notice a subtle gap between who you show others and who you feel yourself to be."},
  P2:{name:'Rationality',hi:'Logic-driven',lo:'Feeling-driven',
    lg:"You decide with data and logic — but at the last moment, you follow your gut. You're probably aware of this contradiction.",
    md:"Do you ever know the rational choice clearly, but feel your heart pulling you somewhere else?",
    sm:"Occasionally you may find yourself caught between what logic says and what something deeper insists."},
  P3:{name:'Interpersonal Distance',hi:'Deep few',lo:'Broad many',
    lg:"You can work any room — but the people you truly open up to fit on one hand. The 'social loner' mask: you're aware of it.",
    md:"You can enjoy large groups — but do you sometimes think 'very few people actually get me'?",
    sm:"Occasionally you may feel uncertain about how much distance to keep in relationships."},
  P4:{name:'Dominance',hi:'Leader',lo:'Follower',
    lg:"The urge to take charge and the urge to let someone else handle it come in waves. Those around you may not know which version is real.",
    md:"Do you find yourself alternating between wanting to lead and wanting to just follow?",
    sm:"Occasionally you may feel uncertain whether to step up or step back."},
  P5:{name:'Sacred Zone',hi:'Non-negotiable territory',lo:'Flexible',
    lg:"You seem flexible — but you have a zone that is completely untouchable. When it's threatened, even you are surprised by the intensity of your reaction.",
    md:"Normally flexible, but certain lines crossed turn on a switch you can't easily turn off?",
    sm:"Occasionally you may be surprised by the strength of something you're not willing to compromise on."},
  P6:{name:'Solitude Preference',hi:'Prefers solitude',lo:'Needs company',
    lg:"You love being with people — yet suddenly need to be completely alone. The 'lone wolf in the pack' — always oscillating between freedom and loneliness.",
    md:"Even in the middle of an enjoyable gathering, do you sometimes feel a sudden need to be alone?",
    sm:"Occasionally you may feel uncertain about the right balance between socializing and solitude."},
  P7:{name:'Drive Source',hi:'Passionate',lo:'Steady',
    lg:"Outwardly calm — but once a switch flips, you're unstoppable. That 'quiet fire' can surprise the people around you.",
    md:"Normally calm, but certain topics or goals make you impossible to stop?",
    sm:"Occasionally you may be surprised by the intensity of your own passion when something truly matters."},
  P8:{name:'Emotional Range',hi:'Wide swings',lo:'Stable',
    lg:"Your exterior is calm water — but inside, a storm. You're performing composure while feeling intensely. Exhausting?",
    md:"Surface calm, but internally experiencing strong emotional movement — do you notice this gap?",
    sm:"Occasionally you may notice a gap between what you show and what you feel."},
  P9:{name:'Orderliness',hi:'Structured',lo:'Free',
    lg:"Perfectly ordered in some domains, surprisingly chaotic in others. Strict about time but the room is a disaster — or vice versa.",
    md:"Meticulous in some areas, completely relaxed in others — do you notice this inconsistency in yourself?",
    sm:"Occasionally you may notice that your level of care and attention varies unexpectedly across different areas of life."},
  P10:{name:'Curiosity',hi:'Explorer',lo:'Stabilizer',
    lg:"Strongly drawn to the new — but reluctant to release the safe. 'I want adventure but need a home base' — this tension is your creative fuel.",
    md:"Attracted to the new while unable to let go of the comfortable — do you feel this pull?",
    sm:"Occasionally you may feel pulled between curiosity and the comfort of the familiar."},
  P11:{name:'Emotional Openness',hi:'Shares openly',lo:'Contains',
    lg:"You want to open up — but a protective wall gets in the way. 'I want to be vulnerable, but I can't.' The conflict is strongest with the people you trust most.",
    md:"Even with people you trust, do you sometimes swallow what you really wanted to say?",
    sm:"Occasionally you may feel the frustration of wanting to express yourself but holding back."},
  P12:{name:'Attachment',hi:'Seeks closeness',lo:'Independent',
    lg:"You prefer solitude — yet desperately need someone's presence. 'I want distance but I'm lonely' — this contradiction is the heart of your relationships.",
    md:"Independent by nature, but sometimes hit by loneliness or unease — do you notice this?",
    sm:"Occasionally you may feel the simultaneous pull of wanting space and wanting connection."},
  P13:{name:'Communication Style',hi:'Empathy-first',lo:'Solution-first',
    lg:"Listening to someone's problem, you're torn between 'I want to fix this' and 'I just want to hold space.' Both are real. Both are you.",
    md:"When someone shares a problem, do your problem-solving instinct and your empathy instinct sometimes conflict?",
    sm:"Occasionally you may feel uncertain whether someone needs an answer or simply to be heard."},
  P14:{name:'Love Expression',hi:'Words',lo:'Actions',
    lg:"Your way of showing love has a clear signature. 'They should just know' and 'I need to say it' live in you simultaneously — and this gap creates misunderstandings with people you care about.",
    md:"Has someone ever been confused because your way of showing care didn't match what they expected?",
    sm:"Occasionally you may wonder whether the way you express care is landing the way you intend."},
  P15:{name:'Conflict Style',hi:'Direct',lo:'Avoidant',
    lg:"You want to avoid conflict — but you can't let it go entirely. Outwardly distant, internally still processing. 'Avoiding while actually facing it' is your contradiction.",
    md:"When something bothers you, do you distance yourself while continuing to think about it?",
    sm:"Occasionally you may find yourself uncertain whether to address a difficulty directly or let it pass."}
}
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Returns question data in current language
 */
window.getQForLang=function(idx){
  if(typeof I18n!=='undefined'&&I18n.getLang()==='en'&&QEN[idx]){
    const base=Q[idx];
    const en=QEN[idx];
    return{...base,cat:en.cat,text:en.text,a:en.a,b:en.b};
  }
  return Q[idx];
};

/**
 * Returns type data in current language
 */
window.getTypeForLang=function(key){
  if(typeof I18n!=='undefined'&&I18n.getLang()==='en'&&TYPES_EN[key]){
    const base=TYPES[key];
    const en=TYPES_EN[key];
    return{...base,...en};
  }
  return TYPES[key];
};

/**
 * Returns contradiction labels in current language
 */
window.getContradictionLabelsEN=function(){
  return DIAG_UI_EN.contradictionLabels;
};

/**
 * Returns analyzing steps in current language
 */
window.getAnalyzingSteps=function(){
  if(typeof I18n!=='undefined'&&I18n.getLang()==='en'){
    return DIAG_UI_EN.analyzingSteps;
  }
  return['15次元のP変数を計算中...','5つの軸を判定中...','矛盾の指紋を検出中...','関係性スタイルを分析中...','32タイプを照合中...','あなたのパターンを描画中...'];
};

/**
 * Returns section label in current language
 */
window.getDiagSectionLabel=function(key){
  if(typeof I18n!=='undefined'&&I18n.getLang()==='en'){
    return DIAG_UI_EN.sectionLabels[key]||key;
  }
  const ja={soul:'魂の設計図',daily:'日常あるある',relations:'人間関係スタイル',careers:'適職',
    strength:'あなたの強み',weakness:'あなたの弱点',contradiction:'矛盾の指紋'};
  return ja[key]||key;
};
