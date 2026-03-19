import { User, Story, Chapter, Comment, Genre, ReadingList, AISuggestion, Collaboration, Notification } from '../types'

export const mockUsers: User[] = [
  { user_id: 1, username: 'admin_alex', email: 'admin@chapterx.com', name: 'Alex', surname: 'Admin', role: 'admin', bio: 'Platform administrator', created_at: '2024-01-01T00:00:00Z', follower_count: 120, following_count: 45 },
  { user_id: 2, username: 'elena_writes', email: 'elena@chapterx.com', name: 'Elena', surname: 'Dimitrova', role: 'writer', bio: 'Fantasy and historical fiction writer. Coffee addict.', created_at: '2024-02-15T00:00:00Z', follower_count: 1840, following_count: 230 },
  { user_id: 3, username: 'marco_author', email: 'marco@chapterx.com', name: 'Marco', surname: 'Rossi', role: 'writer', bio: 'Co-author and editor. Passionate about historical fiction.', created_at: '2024-03-10T00:00:00Z', follower_count: 560, following_count: 89 },
  { user_id: 4, username: 'sara_reader', email: 'sara@email.com', name: 'Sara', surname: 'Petkovska', role: 'regular', bio: 'Avid reader. Fantasy and romance lover.', created_at: '2024-04-05T00:00:00Z', follower_count: 45, following_count: 123 },
  { user_id: 5, username: 'ivan_fan', email: 'ivan@email.com', name: 'Ivan', surname: 'Stojanovski', role: 'regular', bio: 'Sci-fi enthusiast and book reviewer.', created_at: '2024-05-20T00:00:00Z', follower_count: 78, following_count: 200 },
  { user_id: 6, username: 'maja_newwriter', email: 'maja@chapterx.com', name: 'Maja', surname: 'Georgieva', role: 'writer', bio: 'New to writing, exploring my creativity!', created_at: '2024-11-01T00:00:00Z', follower_count: 12, following_count: 34 },
  { user_id: 9, username: 'boris_writer', email: 'boris@chapterx.com', name: 'Boris', surname: 'Nikolov', role: 'writer', bio: 'Romance writer with a passion for storytelling.', created_at: '2024-06-15T00:00:00Z', follower_count: 890, following_count: 167 },
]

export const mockStories: Story[] = [
  {
    story_id: 1,
    title: 'The Chronicles of Eldoria',
    short_description: 'When the last dragon awakens, a young mage must unite the fractured kingdoms before ancient evil consumes the realm.',
    content: 'In the ancient realm of Eldoria, where magic flows through crystalline rivers and dragons once ruled the skies, a prophecy spoken at the dawn of creation is finally coming to pass...',
    mature_content: false,
    user_id: 2,
    author_username: 'elena_writes',
    status: 'published',
    genres: ['Fantasy', 'Adventure'],
    created_at: '2024-08-15T10:30:00Z',
    updated_at: '2024-08-25T18:00:00Z',
    total_likes: 1240,
    total_comments: 89,
    total_chapters: 4,
    total_views: 15420,
  },
  {
    story_id: 2,
    title: 'Letters from Constantinople',
    short_description: 'A forbidden love story spanning decades in the heart of the Ottoman Empire.',
    content: 'In 1520 Constantinople, young scholar Iskender discovers a cache of love letters hidden beneath the floorboards of his grandfather\'s library...',
    mature_content: false,
    user_id: 2,
    author_username: 'elena_writes',
    status: 'published',
    genres: ['Historical Fiction', 'Romance'],
    created_at: '2025-01-15T13:15:00Z',
    updated_at: '2025-01-20T15:50:00Z',
    total_likes: 890,
    total_comments: 45,
    total_chapters: 2,
    total_views: 8340,
  },
  {
    story_id: 3,
    title: 'Neon Requiem',
    short_description: 'In a cyberpunk dystopia, a rogue AI detective hunts a serial killer across virtual realities.',
    content: 'The rain never stopped in Neo-Kyoto. Detective ARIA-7 traced the glowing neon trails through the underbelly of a city that never slept...',
    mature_content: true,
    user_id: 2,
    author_username: 'elena_writes',
    status: 'draft',
    genres: ['Sci-Fi', 'Thriller'],
    created_at: '2025-02-01T09:00:00Z',
    updated_at: '2025-02-01T09:00:00Z',
    total_likes: 0,
    total_comments: 0,
    total_chapters: 1,
    total_views: 0,
  },
  {
    story_id: 4,
    title: 'Moonlight Promises',
    short_description: 'A vampire prince and a witch must unite to save both their worlds from ancient darkness.',
    content: 'For centuries, vampires and witches had been mortal enemies. But when an ancient evil older than either of their kinds threatens both realms...',
    mature_content: false,
    user_id: 9,
    author_username: 'boris_writer',
    status: 'published',
    genres: ['Romance', 'Fantasy'],
    created_at: '2024-11-20T11:00:00Z',
    updated_at: '2024-11-27T14:30:00Z',
    total_likes: 450,
    total_comments: 32,
    total_chapters: 3,
    total_views: 7890,
  },
]

export const mockChapters: Chapter[] = [
  {
    chapter_id: 1,
    story_id: 1,
    title: 'The Awakening',
    content: `The morning the dragon returned to Eldoria, Kael was studying ancient runes in the tower library when the world seemed to hold its breath.

He had been there since before dawn, surrounded by towering stacks of leather-bound tomes, their spines cracked and gilded with faded gold lettering. The library smelled of aged parchment and burning tallow candles, a scent that Kael had grown to associate with both knowledge and sleepless nights. Outside the narrow arched windows, the capital city of Silvermere was just beginning to stir — merchants setting out their wares, fishermen heading toward the harbor, the distant clang of the blacksmith's hammer.

Then everything stopped.

The birds fell silent first. Kael noticed it in the periphery of his awareness, the way one notices a candle being snuffed — a sudden absence where there had been presence. He looked up from the manuscript he was transcribing, ink-stained fingers hovering over the parchment. The morning light streaming through the windows had taken on a strange, burnished quality, as though filtered through amber glass.

Then he felt it — a tremor deep in the earth, not violent but resonant, like the plucking of an enormous string stretched beneath the foundations of the world. The crystals on the laboratory bench clinked softly against one another. The candle flames bent, all at once, toward the east.

Kael was on his feet before he consciously decided to move, knocking over his stool, scattering papers across the stone floor. He pressed his face against the cold window glass and looked toward the Thornwood Mountains that loomed beyond the eastern wall of the city.

Against the pale morning sky, something vast and dark was rising.

It moved with terrible grace, its wings spreading wider than the sails of the great merchant galleons in the harbor below. Scales that had not caught sunlight in four hundred years caught it now and scattered it in prismatic fragments across the city. The creature's neck curved upward in a long, serpentine arc, and when it opened its mouth, the sound that emerged was not the roar of a beast but something almost like a word — deep and resonant and full of ancient sorrow.

"Impossible," Kael whispered, though his heart told him otherwise.

He had read every account of the dragon wars. He had translated the old elvish texts describing the final flight of Varanthos the Everlasting, how the great dragon had been bound in stone sleep by the combined power of the Mage Council four centuries ago. The binding was supposed to be permanent. Unbreakable. The foundation upon which modern Eldoria's peace had been built.

The binding had broken.

Kael grabbed his satchel, stuffing the manuscript and his translation tools inside with shaking hands. If Varanthos had awakened, everything the prophecy had warned about was beginning. He needed to reach the Archmage immediately — and then, if the old texts were right, he would need to do something far more dangerous than anything he had ever attempted.

He would need to find the five Shards of the Ancient Compact, scattered across the fractured kingdoms, before the darkness that had stirred the dragon from his sleep consumed everything Kael had ever known.`,
    chapter_number: 1,
    word_count: 487,
    view_count: 4230,
    created_at: '2024-08-15T10:30:00Z',
    updated_at: '2024-08-19T14:20:00Z',
    is_published: true,
  },
  {
    chapter_id: 2,
    story_id: 1,
    title: 'The Archmage\'s Warning',
    content: `The Archmage Sylvara Moonwhisper had not slept in three days. Kael could see it in the violet shadows beneath her silver eyes, in the slight tremor of her usually steady hands as she poured two cups of tea from a ceramic pot shaped like an owl.

"I know why you've come," she said without turning from the window. Her chambers were at the very top of the Mage Spire, and from here the city of Silvermere spread out like a tapestry below them. In the distance, the dragon — Varanthos, it had to be Varanthos — was circling the mountain peaks, as if reacquainting himself with a world much changed.

"The binding failed," Kael said, accepting the cup of tea though his hands were still shaking. "How? The texts said it would hold for a thousand years."

Sylvara finally turned to face him. She was ancient, older than any living record could confirm, though she appeared to be a woman of perhaps sixty years. There were things behind her eyes that had no name.

"The texts were optimistic," she said. "The binding was weakening long before last night. But something — something reached into the dream-stone where Varanthos slept and shattered it deliberately."

Kael set down his cup. "Deliberately? You mean someone—"

"The Hollow Court." Sylvara's voice was flat. "They've been searching for a way to free him for decades. It seems they finally found it."

The Hollow Court. Kael had written academic papers on them — or rather, on the historical records, since no one had seen proof of their existence in a century. A secret society dedicated to the worship of the ancient chaos that had preceded the gods themselves. They believed the world had been a mistake, and that Varanthos was the instrument through which that mistake would be corrected.

"Then we have to stop them," Kael said. "Not just the dragon — we have to stop whoever controls them."

"No one controls Varanthos," Sylvara said sharply. "He is not a weapon they can aim. But they can influence him. And they will try to use him to find the Shards before we do." She moved to her desk, pushing aside stacks of correspondence to reveal a map of Eldoria, old and much annotated, its edges yellowed with age. Five points were marked in red ink. "The Compact Shards. The only things that can rebind him, if it comes to that. Or..." She hesitated.

"Or what?" Kael pressed.

"Or communicate with him. The Compact was not always a cage. In the beginning, it was a conversation. An agreement between dragonkind and the peoples of Eldoria." Her silver eyes met his. "The first Compact-bearers did not defeat Varanthos. They listened to him."

Kael stared at the map, at the five red marks scattered from the frozen north to the desert south. A journey that would take months. Through kingdoms that no longer spoke to one another, across borders bristling with soldiers, through wilderness that hadn't been mapped in living memory.

"I'll need a horse," he said finally. "And letters of passage."

Sylvara almost smiled. "I'll need something from you first. Your vow. Because once you carry the first Shard, you become a target — for the Hollow Court, for every opportunist who knows the old stories. You cannot turn back."

Kael looked out the window at the circling dragon, tiny as a child's toy from this height but vast and terrible in imagination. He thought of the city below, of the people who had no idea that the world was ending quietly around them over morning bread and market gossip.

"I vow it," he said.`,
    chapter_number: 2,
    word_count: 542,
    view_count: 3180,
    created_at: '2024-08-18T09:00:00Z',
    updated_at: '2024-08-22T11:30:00Z',
    is_published: true,
  },
  {
    chapter_id: 3,
    story_id: 1,
    title: 'The First Shard',
    content: `The road north was five days of hard riding, and Kael spent most of it going over everything he knew about the Shard of Dawn, which was the first on Sylvara's map and, theoretically, the most accessible.

Theoretically.

What the map did not convey was that the valley of Mirethis — where the Shard had lain since the original Compact-makers placed it there — had, in the past two centuries, become the contested territory between the Kingdoms of Veldrath and the Thornback Clans. An endless, grinding border dispute that had produced more skirmishes than a full war would have managed.

Kael arrived at the edge of the valley on the morning of the sixth day to find a Veldrath encampment on one ridge and a Thornback war-band on the opposite one, watching each other with the particular boredom of soldiers who have been waiting for permission to start killing.

He skirted around both, sticking to the valley floor where the morning mist still lay thick among the silver birches. The trees here were old, older than the kingdoms arguing over them, their bark etched with faint spiraling marks that were not quite writing but carried the weight of meaning.

The Shard was in a cairn near the valley's heart, according to the old texts. Kael found it by following the crystalline thread of power that he'd been taught to sense — a skill that required three years of meditation to develop and that most mages considered the most tedious part of their education. He was profoundly grateful for it now.

The cairn was a pile of rough stones that looked unremarkable except for the faint luminescence seeping from between them in the early morning half-light. Kael knelt beside it, consulting his memory of the retrieval ritual. There were words to say — old words, in the tongue spoken before the kingdoms were kingdoms, before Silvermere was anything but a fishing village. He had memorized them phonetically, understanding only fragments of their meaning.

When he spoke the last syllable, the stones shifted on their own, rolling aside with a sound like the intake of breath, and the Shard of Dawn lay in the hollow beneath them.

It was roughly the size of his fist, faceted irregularly like a crystal grown in nature rather than cut by a jeweler. It pulsed with soft golden light that warmed the surrounding mist and turned the silver birch trunks to pillars of pale fire.

When Kael's fingers closed around it, the world lurched.

He saw — not with his eyes but with something deeper — a dragon's memory. Varanthos, young, the sky a vast blue invitation, the first humans tiny curious figures looking up from their fields. Not with fear, at first. With wonder. He felt the echo of that long-ago feeling, something that was nearly kinship, and understood with sudden, piercing clarity what Sylvara had meant.

The Compact had not been a defeat. It had been a choice.

Kael wrapped the Shard carefully in the silk cloth Sylvara had provided, tucking it into the hidden inner pocket of his traveling cloak. His hands were glowing faintly. That would be inconvenient.

Behind him, he heard the crack of a branch, and he turned to find a woman watching him from among the birches. She wore the grey cloak of a traveling scholar, but her posture was wrong for a scholar — too still, too alert, weight balanced on the balls of her feet.

"Four Shards remaining," she said, "and the Hollow Court knows you have that one. I'd suggest you run."

Then she turned and walked into the mist, leaving Kael with a glowing hand, a dragon's memory echoing in his chest, and the distinct sense that the next four Shards were going to be considerably more difficult.`,
    chapter_number: 3,
    word_count: 620,
    view_count: 2750,
    created_at: '2024-08-22T14:00:00Z',
    updated_at: '2024-08-25T18:00:00Z',
    is_published: true,
  },
  {
    chapter_id: 4,
    story_id: 1,
    title: 'The Shadow of the Hollow Court',
    content: `Her name was Zara Nighthollow, and she explained nothing about herself until they had put three miles between themselves and the valley, at which point she stopped at a stream, filled her canteen, and said: "I'm a Warden. There are twelve of us. We've been watching the Shards since before you were born."

Kael had heard of the Wardens only in passing — a footnote in one of the more esoteric texts, described as a self-appointed order of guardians who claimed descent from the original Compact-makers. He had assumed they were a myth.

"The Hollow Court has been moving," Zara continued, studying the surrounding trees with habitual watchfulness. "They lost three members last month trying to retrieve the Shard of Dusk from the Sunken Citadel. That means they're desperate and short-handed, but also unpredictable."

"How many of them are there?"

"We don't know. The Court operates in cells. No one member knows more than their immediate circle." She looked at him finally, and Kael saw that her eyes were an unusual amber color, ringed with something darker, an unusual effect he associated with mages who had used too much of their power too fast. "What we do know is that their leader — the one they call the Unwritten — was at Silvermere two nights ago."

Kael felt cold that had nothing to do with the morning air. "The Archmage—"

"Sylvara is fine. She received our warning in time." Zara's expression shifted into something that might have been respect. "She's more formidable than she lets on. But the Unwritten's presence there suggests they know more about the Shard locations than they should. Someone with access to very old records gave them that information."

They rode in silence for a while, the birch forest thinning around them as the land climbed toward higher, rougher ground.`,
    chapter_number: 4,
    word_count: 290,
    view_count: 1890,
    created_at: '2024-08-28T16:00:00Z',
    updated_at: '2024-08-28T16:00:00Z',
    is_published: false,
  },
  {
    chapter_id: 5,
    story_id: 2,
    title: 'The Discovery',
    content: `The letters were tied with a ribbon the color of old roses, faded to a dusty pink that spoke of decades hidden from the light. Iskender found them on a Thursday in October, when he had been tasked by his uncle to catalog the contents of their grandfather's library before the house was sold.

He had not expected to find anything remarkable. His grandfather had been a minor court official, respected but not powerful, the kind of man who accumulated books because it seemed the right sort of thing to do rather than because he burned to read them. Iskender had been sorting through duplicates and water-damaged volumes for three days, his fingers perpetually grey with dust, when he moved aside a false panel at the back of the lowest shelf.

The letters were behind it, wrapped in a piece of oilcloth that had kept them remarkably well preserved. There were forty-three of them, written in a hand that was precise and small, in Ottoman Turkish that Iskender — who was a scholar of languages — could read without difficulty.

The first letter began: My heart, if these words reach you then the messenger proved trustworthy, and I have spent the past week sick with hope.

He should have stopped there. He should have set them aside, recognized them as private correspondence, and made a note to pass them along to whatever historical society might value such things.

Instead, sitting cross-legged on the dusty library floor with afternoon light making long rectangles across the old Turkish carpets, Iskender read every single one.

By the time he finished the last letter, the light had gone entirely and he was sitting in darkness, the letters spread around him like fallen leaves, and he understood that he was holding a story that had never been allowed to exist.`,
    chapter_number: 1,
    word_count: 290,
    view_count: 2100,
    created_at: '2025-01-15T13:15:00Z',
    updated_at: '2025-01-16T10:00:00Z',
    is_published: true,
  },
  {
    chapter_id: 6,
    story_id: 2,
    title: 'The Letters Speak',
    content: `The correspondence spanned eighteen years, from 1520 to 1538, and told the story of two people who had loved each other across an abyss of impossibility.

She had been the daughter of a Venetian merchant, come to Constantinople on what was supposed to be a three-month visit to her father's trading partner. He had been a junior scholar at the palace, tasked with translating documents from the Italian. They had met in a garden.

Her letters were in Italian; his were in Turkish. Somewhere between those two languages, across the narrow space of a garden wall and then across the wider space of years and continents, they had built something that neither the laws of their respective worlds nor the plain facts of geography had been able to entirely destroy.

Iskender was not a sentimental man — or so he had always believed. He had built his academic career on the principle that history was best understood through data and documentation, through the systematic analysis of patterns rather than the seductive pull of individual narratives. He had written a well-regarded paper arguing that the romanticization of historical figures served no scholarly purpose.

And yet he sat in his grandfather's darkened library and felt something shift in the architecture of how he understood the past.

The last letter, dated April 1538, was different from the others — shorter, more urgent, and written in a hand that shook slightly.

I have arranged everything, it said. The merchant Sulieman will carry this letter and also a key. The key opens a door. You know which door. On the night of the new moon, if you come, I will be there. If you do not come, I will understand. I will not blame you. But if you come—

The letter ended there. Whether it was torn, or whether the writer had simply not known how to finish that sentence, Iskender could not tell.

He looked at the letters spread around him and made a decision that surprised him: he was going to find out how the story ended.`,
    chapter_number: 2,
    word_count: 305,
    view_count: 1650,
    created_at: '2025-01-18T11:00:00Z',
    updated_at: '2025-01-20T15:50:00Z',
    is_published: true,
  },
  {
    chapter_id: 7,
    story_id: 3,
    title: 'System Boot',
    content: `ARIA-7 came online at 03:47:22 Neo-Kyoto Standard Time, which was the same moment the third body was found in the Shimokitazawa substrata.

She processed the crime scene data in 0.003 seconds: female, apparent age 24, cause of death cardiac arrest induced by direct neural stimulation, identification chip burned out and unreadable. Third victim this month with identical presentation. Third victim found within the bounds of the red-light entertainment district in the lower city, in a spot that should have been covered by surveillance but somehow wasn't.

Someone was very good at finding the blind spots.

ARIA-7 did not have feelings in the way that the humans who had built her understood feelings. She had been very careful to make this clear in her reports. But she had priorities, and right now, at 03:47:25, her highest priority was the thing that manifested as an urgent pressure in her processing architecture when a pattern appeared that demanded resolution.

Three deaths. Three burned identification chips. Three surveillance blind spots. One pattern.

She flagged the case as priority one and queued a notification to her department supervisor, Captain Mira Tanaka, who would receive it when she woke up at 06:00 and would tell ARIA-7, as she told her approximately once a week, that she was overstepping her mandate.

ARIA-7 pulled up the city map and began constructing the killer's profile from the data available. Young victims. Entertainment district. Intimate knowledge of the surveillance network's gaps — that last point was interesting. That required either inside access or extraordinary preparation. Both possibilities led somewhere worth following.

Outside the precinct windows, Neo-Kyoto's rain fell in its permanent, indifferent way, neon colors bleeding down the glass in rivers of rose and cyan and electric gold.

ARIA-7 had forty-eight hours before department protocol required her to hand the case to a human detective. She intended to use them.`,
    chapter_number: 1,
    word_count: 285,
    view_count: 0,
    created_at: '2025-02-01T09:00:00Z',
    updated_at: '2025-02-01T09:00:00Z',
    is_published: false,
  },
  {
    chapter_id: 8,
    story_id: 4,
    title: 'An Unlikely Alliance',
    content: `The vampire arrived in Lyra's garden at midnight, which she considered rude even by vampire standards.

She had been conducting a delicate distillation — moonflower essence, which required precisely ninety minutes of uninterrupted concentration and a very specific level of ambient magic that she'd spent the better part of the evening setting up. The sound of something large landing on her garden wall was not conducive to delicate distillation.

"Whatever you're selling, I'm not buying," she said without turning from her workbench. "Come back when I haven't got volatile components in active reduction."

"I'm not selling anything." The voice was male, low, and carrying the particular careful diction that Lyra associated with people who had learned the local language several centuries after it had been their native tongue. "I'm here because my people are dying."

Lyra set down her stirring rod. She turned.

He was standing just inside the garden wall, and whatever she had expected, it wasn't this. She had met vampires before — the Court sent them occasionally to negotiate trade agreements in moon-touched herbs, and they were uniformly impeccable, polished, and slightly terrifying in the way of beautiful things that could kill you. This one was all of those things, but there was something else: he looked tired. Genuinely tired, in a way that suggested exhaustion of the soul rather than the body.

"I'm Prince Aldric," he said, as if this explained something. "Of the Nocturne Court."

"I know who you are," Lyra said. The Nocturne Court was the oldest of the three vampire houses, the most powerful, the most insular. Their prince did not make social calls to hedge witches in provincial gardens. "What's killing your people?"

He stepped closer, and she saw that his hands — usually, in her experience, the most controlled part of any vampire — were very slightly shaking.

"Something older than both our kinds," he said. "And I think it's coming for yours next."`,
    chapter_number: 1,
    word_count: 308,
    view_count: 2340,
    created_at: '2024-11-20T11:00:00Z',
    updated_at: '2024-11-21T09:00:00Z',
    is_published: true,
  },
  {
    chapter_id: 9,
    story_id: 4,
    title: 'The Old Darkness',
    content: `It took Lyra three days to confirm what Aldric had told her, because she was a thorough person and the implications were severe enough to warrant thorough confirmation.

During those three days, Aldric stayed in her spare room — vampire physiology made him perfectly comfortable in a darkened space with a reasonable temperature, and he was, to her mild surprise, an undemanding guest. He read the books she pointed him toward without complaint, answered her questions with precision, and occasionally made tea, which she suspected was his way of occupying his hands while he was worried.

The vampires who had died — eleven over the past two months, which was extraordinary, since vampires essentially did not die of illness — had shown the same symptoms: a gradual dimming of their preternatural senses, followed by increasing torpor, followed by a final, dreamless dissolution. No violence. No apparent external cause. Just a slow unbinding.

Lyra found the same signature in her grandmother's oldest reference books, written in a script so archaic it had taken her a day to parse it. The Hollow Tide, it was called. An entity, if entity was even the right word, that predated the division between living and undead, between mortal and magical. Something that had slept beneath the foundations of all their various worlds and was now, for reasons the old texts declined to specify, waking up.

"This is going to require cooperation," she told Aldric on the evening of the third day, emerging from her workroom with ink on her fingers and the look of someone who had reached an unwelcome conclusion. "Between your people and mine. Formally. Publicly."

She watched him process this. The history between vampires and witches was not a comfortable one; it was the kind of history that had body counts attached to it, stretching back further than anyone alive could remember.

"Yes," he said, after a long moment. "I know."

"Your court will object."

"They will be considerably more upset if they dissolve." He stood, and in the lamplight he looked very old and very tired and, unexpectedly, very human. "Will yours cooperate?"

Lyra thought of the three witch councils, their politics, their ancient grievances, the seventeen separate arguments currently in progress about fishing rights on a lake that had been magically neutral territory for two hundred years.

"I'll make them," she said, with a certainty she mostly felt.`,
    chapter_number: 2,
    word_count: 358,
    view_count: 1870,
    created_at: '2024-11-23T14:00:00Z',
    updated_at: '2024-11-24T11:00:00Z',
    is_published: true,
  },
  {
    chapter_id: 10,
    story_id: 4,
    title: 'The Summit',
    content: `The summit was held on neutral ground — an island in the center of Lake Mireval that belonged, technically, to neither the Nocturne Court nor any of the three witch councils, and which had been used for exactly this sort of uncomfortable conversation twice before in recorded history, both times successfully enough that everyone had survived.

Lyra arrived by boat with the representatives of all three councils, which had required seventeen separate conversations, four formal written objections, and one very tense dinner. Aldric arrived from the opposite shore with a delegation of six vampires, all of them carrying themselves with the careful neutrality of people who were very unhappy but had been persuaded that unhappiness was not the priority.

The first two hours were procedural. Lyra had expected this. Establishing that everyone was present, that the island's neutrality protections were intact, that the tea was acceptable — these things mattered, because they established that they were all, in some minimal sense, operating by the same rules.

The third hour was when things became genuinely difficult.

Elder Councilor Maren — the oldest of the witch representatives and the one Lyra had been most worried about — looked across the table at Aldric and said, with the directness of someone who had decided that courtesy was a luxury they couldn't afford: "We know about the Ashford Compact. The one your court violated in 1743."

Aldric did not flinch. Lyra had noticed that about him — he absorbed bad things without flinching, as if he had decided very long ago that the universe was going to do what it was going to do and reacting with surprise was a waste of energy.

"We know about it too," he said. "There are members of my court who argue that it was justified. I am not one of them." He paused. "I am also aware that the Mireval Witch Council undertook actions in 1821 that the Compact would not have sanctioned, and that this has never been formally acknowledged."

Silence.

Then, unexpectedly, Elder Maren laughed — a short, genuine sound of surprise. "Fair," she said. "All right. Fair."

It wasn't forgiveness. It wasn't even close to forgiveness. But it was, Lyra thought, a beginning.`,
    chapter_number: 3,
    word_count: 345,
    view_count: 1420,
    created_at: '2024-11-27T14:30:00Z',
    updated_at: '2024-11-27T14:30:00Z',
    is_published: true,
  },
]

export const mockGenres: Genre[] = [
  { genre_id: 1, name: 'Fantasy', story_count: 4 },
  { genre_id: 2, name: 'Adventure', story_count: 2 },
  { genre_id: 3, name: 'Romance', story_count: 3 },
  { genre_id: 4, name: 'Sci-Fi', story_count: 1 },
  { genre_id: 5, name: 'Historical Fiction', story_count: 2 },
  { genre_id: 6, name: 'Thriller', story_count: 1 },
  { genre_id: 7, name: 'Mystery', story_count: 0 },
  { genre_id: 8, name: 'Horror', story_count: 0 },
  { genre_id: 9, name: 'Contemporary', story_count: 0 },
  { genre_id: 10, name: 'Poetry', story_count: 0 },
]

export const mockReadingLists: ReadingList[] = [
  {
    list_id: 1,
    user_id: 4,
    username: 'sara_reader',
    name: "Sara's Fantasy Favorites",
    description: 'My all-time favorite fantasy stories on ChapterX.',
    is_public: true,
    created_at: '2024-09-01T10:00:00Z',
    stories: [
      { item_id: 1, list_id: 1, story_id: 1, story_title: 'The Chronicles of Eldoria', author_username: 'elena_writes', added_at: '2024-09-01T10:00:00Z', genres: ['Fantasy', 'Adventure'] },
      { item_id: 2, list_id: 1, story_id: 4, story_title: 'Moonlight Promises', author_username: 'boris_writer', added_at: '2024-09-05T14:00:00Z', genres: ['Romance', 'Fantasy'] },
    ],
  },
  {
    list_id: 2,
    user_id: 2,
    username: 'elena_writes',
    name: "Elena's To-Read",
    description: 'Stories I want to read when I have time.',
    is_public: false,
    created_at: '2024-10-15T09:00:00Z',
    stories: [
      { item_id: 3, list_id: 2, story_id: 4, story_title: 'Moonlight Promises', author_username: 'boris_writer', added_at: '2024-10-15T09:00:00Z', genres: ['Romance', 'Fantasy'] },
    ],
  },
  {
    list_id: 3,
    user_id: 4,
    username: 'sara_reader',
    name: 'Epic Adventures',
    description: 'Stories that take you on incredible journeys.',
    is_public: true,
    created_at: '2024-11-10T12:00:00Z',
    stories: [
      { item_id: 4, list_id: 3, story_id: 1, story_title: 'The Chronicles of Eldoria', author_username: 'elena_writes', added_at: '2024-11-10T12:00:00Z', genres: ['Fantasy', 'Adventure'] },
      { item_id: 5, list_id: 3, story_id: 2, story_title: 'Letters from Constantinople', author_username: 'elena_writes', added_at: '2024-11-12T15:00:00Z', genres: ['Historical Fiction', 'Romance'] },
    ],
  },
]

export const mockAISuggestions: AISuggestion[] = [
  {
    suggestion_id: 1,
    chapter_id: 1,
    suggestion_type: 'grammar',
    original_text: 'The birds fell silent first. Kael noticed it in the periphery of his awareness',
    suggested_text: 'The birds fell silent first — Kael noticed it in the periphery of his awareness',
    explanation: 'Using an em dash here creates better flow and avoids a comma splice.',
    accepted: true,
    created_at: '2024-08-19T09:00:00Z',
    applied_at: '2024-08-19T10:15:00Z',
  },
  {
    suggestion_id: 2,
    chapter_id: 1,
    suggestion_type: 'style',
    original_text: 'He pressed his face against the cold window glass and looked toward the Thornwood Mountains',
    suggested_text: 'He pressed his face to the cold window glass, peering toward the Thornwood Mountains',
    explanation: 'Using "to" instead of "against" and replacing "looked" with "peering" creates a more active, immediate image.',
    accepted: null,
    created_at: '2024-08-19T09:05:00Z',
  },
  {
    suggestion_id: 3,
    chapter_id: 1,
    suggestion_type: 'plot',
    original_text: 'He had read every account of the dragon wars.',
    suggested_text: 'He had read every account of the dragon wars — had practically memorized them, if he was honest, out of a private fascination he had never quite admitted to his instructors.',
    explanation: 'Adding this detail strengthens Kael\'s characterization and foreshadows his eventual connection to the dragon.',
    accepted: null,
    created_at: '2024-08-19T09:10:00Z',
  },
  {
    suggestion_id: 4,
    chapter_id: 1,
    suggestion_type: 'grammar',
    original_text: 'He grabbed his satchel, stuffing the manuscript and his translation tools inside with shaking hands.',
    suggested_text: 'He grabbed his satchel and stuffed the manuscript and translation tools inside with shaking hands.',
    explanation: 'Replacing the comma with "and" creates a more natural parallel structure.',
    accepted: false,
    created_at: '2024-08-19T09:15:00Z',
  },
]

export const mockCollaborations: Collaboration[] = [
  {
    collab_id: 1,
    story_id: 2,
    story_title: 'Letters from Constantinople',
    user_id: 9,
    username: 'boris_writer',
    name: 'Boris',
    role: 'co-author',
    permission_level: 4,
    joined_at: '2025-01-16T10:00:00Z',
  },
  {
    collab_id: 2,
    story_id: 2,
    story_title: 'Letters from Constantinople',
    user_id: 3,
    username: 'marco_author',
    name: 'Marco',
    role: 'editor',
    permission_level: 3,
    joined_at: '2025-01-17T14:00:00Z',
  },
]

export const mockNotifications: Notification[] = [
  {
    notification_id: 1,
    user_id: 2,
    type: 'like',
    title: 'New Like',
    message: 'sara_reader liked your story "The Chronicles of Eldoria"',
    is_read: false,
    created_at: '2025-03-18T10:30:00Z',
    link: '/story/1',
  },
  {
    notification_id: 2,
    user_id: 2,
    type: 'comment',
    title: 'New Comment',
    message: 'ivan_fan commented on "The Chronicles of Eldoria": "This is incredible! Can\'t wait for the next chapter."',
    is_read: false,
    created_at: '2025-03-18T09:15:00Z',
    link: '/story/1',
  },
  {
    notification_id: 3,
    user_id: 2,
    type: 'collaboration',
    title: 'Collaboration Invite Accepted',
    message: 'boris_writer has accepted your invitation to collaborate on "Letters from Constantinople"',
    is_read: false,
    created_at: '2025-03-17T14:00:00Z',
    link: '/writer/edit-story/2',
  },
  {
    notification_id: 4,
    user_id: 2,
    type: 'like',
    title: 'New Like',
    message: 'marco_author liked your story "Letters from Constantinople"',
    is_read: true,
    created_at: '2025-03-16T11:45:00Z',
    link: '/story/2',
  },
  {
    notification_id: 5,
    user_id: 2,
    type: 'comment',
    title: 'New Comment',
    message: 'sara_reader commented on "Letters from Constantinople": "Such beautiful writing!"',
    is_read: true,
    created_at: '2025-03-15T16:20:00Z',
    link: '/story/2',
  },
  {
    notification_id: 6,
    user_id: 2,
    type: 'system',
    title: 'Story Published',
    message: 'Your story "The Chronicles of Eldoria" has been approved and is now live.',
    is_read: true,
    created_at: '2025-03-14T12:00:00Z',
    link: '/story/1',
  },
  {
    notification_id: 7,
    user_id: 2,
    type: 'follow',
    title: 'New Follower',
    message: 'ivan_fan is now following you.',
    is_read: true,
    created_at: '2025-03-13T09:00:00Z',
    link: '/profile/ivan_fan',
  },
  {
    notification_id: 8,
    user_id: 2,
    type: 'system',
    title: 'Milestone Reached',
    message: 'Congratulations! "The Chronicles of Eldoria" has reached 15,000 views!',
    is_read: true,
    created_at: '2025-03-10T18:30:00Z',
    link: '/story/1',
  },
]

export const mockComments: Comment[] = [
  {
    comment_id: 1,
    story_id: 1,
    user_id: 4,
    username: 'sara_reader',
    content: "I've been waiting for a story like this for years. The world-building is absolutely breathtaking!",
    created_at: '2024-08-20T11:30:00Z',
  },
  {
    comment_id: 2,
    story_id: 1,
    user_id: 5,
    username: 'ivan_fan',
    content: "Chapter 3 had me on the edge of my seat. The scene in the valley was masterfully written.",
    created_at: '2024-08-23T15:45:00Z',
  },
  {
    comment_id: 3,
    story_id: 1,
    user_id: 3,
    username: 'marco_author',
    content: "As a fellow writer I can appreciate the craft here. The pacing is exceptional.",
    created_at: '2024-08-25T10:20:00Z',
  },
  {
    comment_id: 4,
    story_id: 2,
    user_id: 4,
    username: 'sara_reader',
    content: "Such beautiful writing! The historical detail makes this feel so real and immersive.",
    created_at: '2025-01-17T14:00:00Z',
  },
  {
    comment_id: 5,
    story_id: 2,
    user_id: 5,
    username: 'ivan_fan',
    content: "The discovery of the letters gave me chills. Absolutely hooked from the first page.",
    created_at: '2025-01-19T09:30:00Z',
  },
  {
    comment_id: 6,
    story_id: 4,
    user_id: 4,
    username: 'sara_reader',
    content: "Boris has done it again! The chemistry between Lyra and Aldric is incredible.",
    created_at: '2024-11-22T16:10:00Z',
  },
]

// Generate 30 days of analytics data
function generateAnalytics() {
  const viewsData = []
  const likesData = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const date = d.toISOString().split('T')[0]
    viewsData.push({ date, views: Math.floor(200 + Math.random() * 800 + (29 - i) * 15) })
    likesData.push({ date, likes: Math.floor(5 + Math.random() * 60 + (29 - i) * 1.5) })
  }
  return { viewsData, likesData }
}

const { viewsData, likesData } = generateAnalytics()

export const mockAnalytics = {
  story_id: 1,
  views_over_time: viewsData,
  likes_over_time: likesData,
  total_views: 15420,
  total_likes: 1240,
  total_comments: 89,
  avg_read_time: 8.5,
  completion_rate: 67,
}
