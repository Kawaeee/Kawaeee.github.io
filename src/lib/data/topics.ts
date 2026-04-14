import type { MessageContent } from '$lib/types';
import { profile, contacts } from './profile';
import { experiences } from './experiences';
import { projects } from './projects';
import { skillGroups } from './skills';

export interface TopicDef {
    id: string;
    keywords: string[];
    phrases?: string[];
    reply: () => MessageContent[];
}

const r = (text: string): MessageContent => ({ kind: 'text', text });

// Narrows the inferred `id` to its string literal so `TopicId` below can be derived from `topics`.
const topic = <Id extends string>(t: TopicDef & { id: Id }): TopicDef & { id: Id } => t;

export const topics = [
    // --- TIER 1: HIGH SPECIFICITY / NICHE INTENTS ---
    // Place highly specific topics here so they always win ties against generic topics
    
    topic({
        id: 'salary',
        keywords: [
            'salary', 'pay', 'compensation', 'rate', 'rates', 'money', 'expected',
            'budget', 'equity', 'benefits', 'wage'
        ],
        phrases: [
            'salary expectations', 'how much do you charge', 'hourly rate', 'expected salary',
            'compensation package', 'how much money', 'what is your rate'
        ],
        reply: () => [
            r("My compensation expectations are flexible and depend heavily on the role, the scope of responsibilities, and the total benefits package. I'd love to chat more about the specific position to align on this!")
        ]
    }),
    topic({
        id: 'availability',
        keywords: [
            'start', 'availability', 'available', 'notice', 'onboarding', 'join'
        ],
        phrases: [
            'when can you start', 'start date', 'notice period', 'are you available',
            'when can you join', 'how soon can you start'
        ],
        reply: () => [
            r("I am currently employed, so I would require a standard notice period to ensure a smooth handover for my current team. However, I am fully open to interviewing now for the right opportunity.")
        ]
    }),
    topic({
        id: 'working_style',
        keywords: [
            'agile', 'scrum', 'sprint', 'management', 'style', 'culture', 'teamwork', 
            'independent', 'solo', 'collaborative', 'operate', 'workflow'
        ],
        phrases: [
            'how do you work', 'working style', 'work environment', 'team player', 'culture fit',
            'do you work well in a team', 'independent worker'
        ],
        reply: () => [
            r("I'm highly self-driven and comfortable taking ownership of projects from proof-of-concept to production. I thrive in collaborative environments where engineering, data, and business teams communicate closely.")
        ]
    }),
    topic({
        id: 'bot_identity',
        // Keep this list tight: generic ML terms like 'llm'/'model' belong to `skills`,
        // and phrases like 'how do you work' belong to `working_style`.
        keywords: [
            'ai', 'chatgpt', 'gpt', 'gemini', 'claude', 'prompt',
            'openai', 'anthropic', 'prompting', 'skynet', 'hal'
        ],
        phrases: [
            'are you an ai', 'are you ai', 'what model are you', 'are you chatgpt',
            'is this ai', 'what is your system prompt', 'are you real'
        ],
        reply: () => [
            r("Haha, I am actually NOT an LLM! I am a lightning-fast, rule-based chat bot built specifically for this portfolio."),
            r("No API keys, no server costs, zero latency. Just pure regex and keyword matching. 😉")
        ]
    }),
    topic({
        id: 'joke',
        keywords: [
            'joke', 'funny', 'laugh', 'humor', 'pun', 'puns', 'hilarious', 'joking'
        ],
        phrases: [
            'tell me a joke', 'make me laugh', 'say something funny', 'do you know any jokes'
        ],
        reply: () => [
            r("Why was the language model acting so crazy?"), 
            r("Someone turned its temperature up to 1.0! 🌡️")
        ]
    }),
    topic({
        id: 'articles',
        keywords: [
            'article', 'articles', 'blog', 'blogs', 'write', 'writing', 'post', 'posts', 
            'publish', 'published', 'medium', 'tutorial', 'guide', 'guides', 'substack',
            'author', 'content'
        ],
        phrases: [
            'do you write', 'your medium', 'read your articles', 'technical writing',
            'blog posts', 'written content', 'read your blog'
        ],
        reply: () => [
            r("Yes, I love writing technical guides! I publish on Medium, covering topics like CUDA-enabled Docker on WSL2 and local LLM orchestration."),
            r("Check out the 'Hedgehoglet' entry in my experience section, or find my Medium link in the contact menu.")
        ]
    }),
    topic({
        id: 'learning',
        keywords: [
            'learning', 'studying', 'reading', 'focus', 'currently', 'next', 'future',
            'exploring', 'roadmap', 'trends'
        ],
        phrases: [
            'what are you learning', 'current focus', 'what is next', 'learning right now',
            'what are you studying', 'new technologies'
        ],
        reply: () => [
            r("Right now, I'm heavily focused on advanced LLM orchestration, agentic workflows (using tools like LangGraph), and optimizing RAG pipelines for enterprise environments.")
        ]
    }),
    topic({
        id: 'spoken_languages',
        keywords: [
            'speak', 'speaking', 'fluent', 'fluency', 'bilingual', 'english', 'thai',
            'communicate', 'communication', 'native'
        ],
        phrases: [
            'what languages do you speak', 'do you speak english', 'do you speak thai', 
            'spoken languages', 'language proficiency', 'are you fluent'
        ],
        reply: () => [
            r("I am a native Thai speaker and fully proficient in professional English for technical documentation, cross-functional collaboration, and everyday team communication.")
        ]
    }),

    // --- TIER 2: CORE PORTFOLIO ---
    
    topic({
        id: 'skills',
        keywords: [
            'skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'tool', 
            'tools', 'language', 'languages', 'framework', 'frameworks', 'know', 'use',
            'expertise', 'proficient', 'proficiency', 'familiar', 'abilities', 'capable',
            'python', 'typescript', 'sql', 'bash', 'scala', 'javascript', 'js', 'ts',
            'llm', 'llms', 'rag', 'nlp', 'vision', 'cv', 'pytorch', 'tensorflow', 'dspy', 'langgraph',
            'aws', 'gcp', 'vertex', 'sagemaker', 'cloud', 'docker', 'linux', 'ci', 'cd', 'pipeline',
            'fastapi', 'flask', 'streamlit', 'svelte', 'react', 'nextjs', 'git', 'github',
            'pandas', 'numpy', 'scikit', 'keras', 'node', 'express', 'rest', 'api', 'databases',
            'mongodb', 'postgres', 'mysql', 'nosql', 'kubernetes', 'k8s'
        ],
        phrases: [
            'tech stack', 'what do you know', 'what do you use', 'machine learning', 
            'data science', 'computer vision', 'data engineering', 'are you familiar with',
            'do you know', 'can you code in', 'how is your', 'what tools', 'what languages',
            'programming languages', 'software stack', 'are you good at', 'technical skills'
        ],
        reply: () => [
            r("My expertise spans Data Science, MLOps, and Backend engineering. Here is the tech I reach for most:"), 
            { kind: 'skills', groups: skillGroups }
        ]
    }),
    topic({
        id: 'experience',
        keywords: [
            'experience', 'work', 'job', 'jobs', 'career', 'company', 'companies', 
            'employer', 'employers', 'history', 'role', 'roles', 'where', 'past', 
            'employment', 'osotspa', 'eatlab', 'omniscien', 'datawow', 'duties', 
            'tasks', 'positions', 'responsibilities', 'track', 'record', 'profession'
        ],
        phrases: [
            'work experience', 'where have you worked', 'work history', 'past jobs', 
            'current job', 'previous jobs', 'where do you work', 'what is your job',
            'professional background', 'what did you do', 'track record', 
            'places you worked', 'career history', 'employment history'
        ],
        reply: () => [
            r("Here's a breakdown of my professional experience, most recent first:"),
            { kind: 'experiences', items: experiences }
        ]
    }),
    topic({
        id: 'projects',
        keywords: [
            'project', 'projects', 'portfolio', 'build', 'built', 'made', 'making', 
            'github', 'side', 'repo', 'repos', 'app', 'apps', 'website', 'code', 
            'software', 'examples', 'showcase', 'products', 'demos', 'personal',
            'repositories', 'creations', 'developed', 'developing', 'work'
        ],
        phrases: [
            'side project', 'what have you built', 'your work', 'show me your', 
            'github repos', 'source code', 'examples of your work', 'what have you made',
            'see your projects', 'link to your github', 'stuff you made', 
            'things you built', 'showcase your work', 'personal projects'
        ],
        reply: () => [
            r("I love building things. Here's a selection of my favorite projects:"),
            { kind: 'projects', items: projects }
        ]
    }),
    topic({
        id: 'education',
        keywords: [
            'education', 'degree', 'university', 'college', 'school', 'study', 
            'studied', 'graduated', 'graduation', 'bachelor', 'bachelors', 'kmutt', 
            'cs', 'academic', 'academics', 'major', 'gpa', 'alumni', 'student'
        ],
        phrases: [
            'where did you study', 'your education', 'what is your degree', 
            'where did you go to school', 'university background', 'academic background',
            'did you go to college', 'what did you study', 'educational history'
        ],
        reply: () => [
            r("I hold a Bachelor's degree in Computer Science from King Mongkut's University of Technology Thonburi (KMUTT).")
        ]
    }),
    topic({
        id: 'location',
        keywords: [
            'location', 'based', 'live', 'living', 'city', 'country', 'where', 
            'timezone', 'remote', 'hybrid', 'relocate', 'bangkok', 'thailand', 'bkk',
            'commute', 'wfh', 'relocation', 'area'
        ],
        phrases: [
            'where do you live', 'where are you based', 'are you remote', 
            'open to remote', 'what timezone', 'where are you located', 'work from home',
            'can you relocate', 'remote friendly', 'where in the world'
        ],
        reply: () => [
            r(`I am currently based in ${profile.location}.`),
            r("I have extensive experience working in hybrid setups and I am open to discussing remote opportunities depending on the team and timezone.")
        ]
    }),
    topic({
        id: 'contact',
        keywords: [
            'contact', 'email', 'reach', 'linkedin', 'social', 'socials', 'medium', 
            'github', 'hire', 'hiring', 'message', 'dm', 'connect', 'talk', 'call', 
            'mail', 'freelance', 'opportunities', 'interview', 'schedule', 'chat',
            'meeting', 'discuss'
        ],
        phrases: [
            'get in touch', 'how to reach', 'contact you', 'reach out', 'hire you', 
            'send an email', 'open to work', 'looking for a job', 'book a call', 'let\'s chat',
            'set up a meeting', 'schedule an interview', 'contact info', 'hit me up'
        ],
        reply: () => [
            r("I'm always open to discussing new opportunities, tech, or exciting projects. Choose whatever platform works best for you:"),
            { kind: 'contacts', items: contacts }
        ]
    }),
    topic({
        id: 'bio',
        keywords: [
            'about', 'bio', 'yourself', 'you', 'who', 'intro', 'introduce', 
            'background', 'story', 'kaw', 'kasidech', 'profile', 'summary', 
            'tldr', 'overview', 'pitch', 'journey', 'biography', 'info',
            'whoami', 'origin', 'personal', 'characteristics', 'identity'
        ],
        phrases: [
            'about you', 'who are you', 'tell me about yourself', 'who is',
            'your background', 'what do you do', 'who r u', 'elevator pitch',
            'a little bit about', 'describe yourself', 'what is your story',
            'give me an overview', 'who exactly are you', 'introduce yourself'
        ],
        reply: () => [
            r(profile.bio),
            r(`Currently working as a ${profile.currentRole} and based in ${profile.location}.`)
        ]
    }),

    // --- TIER 3: CONVERSATIONAL & GENERIC ---
    
    topic({
        id: 'greeting',
        keywords: [
            'hi', 'hello', 'hey', 'yo', 'sup', 'howdy', 'greetings', 'wazzup',
            'morning', 'afternoon', 'evening', 'bot', 'chatbot', 'ping'
        ],
        phrases: [
            "what's up", "good morning", "good afternoon", "good evening",
            "how are you", "how are u", "hey there", "is anyone there",
            "hello world", "test message"
        ],
        reply: () => [
            r(`Hey! 👋 I'm ${profile.nickname}. Ask me about my experience, tech stack, projects, or my technical writing.`)
        ]
    }),
    topic({
        id: 'thanks',
        keywords: [
            'thanks', 'thank', 'thx', 'cheers', 'ty', 'awesome', 'cool', 'sick',
            'great', 'nice', 'perfect', 'ok', 'okay', 'wow', 'amazing', 'sweet', 'dope',
            'understood', 'roger', 'neat', 'brilliant', 'fantastic'
        ],
        phrases: [
            'thank you', 'looks good', 'good job', 'nice work', 'makes sense', 
            'sounds good', 'much appreciated', 'very cool', 'got it'
        ],
        reply: () => [r("You're very welcome! Let me know if you want to explore anything else.")]
    }),
    topic({
        id: 'goodbye',
        keywords: [
            'bye', 'goodbye', 'cya', 'later', 'peace', 'exit', 'close', 'quit', 'out'
        ],
        phrases: [
            'see you', 'see ya', 'catch you later', 'have a good one', 'talk to you later',
            'bye bye', 'im leaving'
        ],
        reply: () => [r("Thanks for chatting! Feel free to reach out via email or LinkedIn if you ever want to connect. Have a great day!")]
    }),
    topic({
        id: 'help',
        keywords: [
            'help', 'menu', 'options', 'topics', 'what', 'can', 'ask', 'navigate', 
            'stuck', 'confused', 'commands', 'features'
        ],
        phrases: [
            'what can i ask', 'what can you do', 'help me', 'show menu', 'i dont know',
            'what are my options', 'how does this work', 'give me a hint'
        ],
        reply: () => [
            r('Here are the main topics you can explore — tap a chip below or type freely:'),
            {
                kind: 'suggestions',
                items: ['Experience', 'Skills', 'Projects', 'Education', 'Contact']
            }
        ]
    }),

    // --- TIER 4: CATCH-ALL ---

    topic({
        id: 'fallback',
        keywords: [],
        reply: () => [
            r("Hmm, I didn't quite catch that. Please make sure you are asking in English, as I'm just a simple, hardcoded bot!"),
            r("You can try asking about my skills, experience, or tap a button below:"),
            {
                kind: 'suggestions',
                items: ['Experience', 'Skills', 'Projects', 'Contact']
            }
        ]
    })
];

export type TopicId = (typeof topics)[number]['id'];

export const topicById = (id: TopicId) =>
    topics.find((t) => t.id === id) ?? topics.find((t) => t.id === 'fallback')!;