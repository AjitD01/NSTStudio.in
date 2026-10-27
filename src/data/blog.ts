/** Blog posts. Text is reproduced from NST Studio's own LinkedIn article, unchanged. */

export type Block =
  | { type: 'epigraph'; text: string; cite: string }
  | { type: 'p'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'question'; text: string };

export interface Post {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  readTime: string;
  cover: string;
  excerpt: string;
  linkedinUrl: string;
  tags: string[];
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: 'transparent-storytelling',
    title: 'Transparent Storytelling Builds Unforgettable Brands',
    date: '20 Jul 2026',
    dateISO: '2026-07-20',
    readTime: '4 min read',
    cover: '/blog/transparent-storytelling.jpg',
    excerpt:
      "I don't think the best stories are the loudest. I think they're the ones that become invisible—where you stop noticing the storytelling and simply remember how it made you feel.",
    linkedinUrl:
      'https://www.linkedin.com/posts/i-dont-think-the-best-stories-are-the-loudest-ugcPost-7484989156117508096-ihLC',
    tags: ['NSTStudio', 'StoryFirst', 'BrandStorytelling', 'BrandStrategy', 'Branding', 'BrandIdentity', 'BrandBuilding'],
    body: [
      { type: 'epigraph', text: '“Good design is obvious. Great design is transparent.”', cite: 'Joe Sparano' },
      {
        type: 'p',
        text: "I read that line years ago and couldn't stop thinking about it. I believe it's not really about design; it's about storytelling.",
      },
      { type: 'pull', text: '“Good design is obvious. Great storytelling is transparent — and impossible to forget.”' },
      {
        type: 'p',
        text: "Here's what I mean. The best stories never announce themselves. They don't say “look how clever I am.” They just slip into your life quietly — shaping what you believe, teaching you something, staying with you long after you've forgotten who told it to you. Think about it. You don't remember narrative structure when you're crying at a film. You're not analyzing character arcs mid-book. When your grandparent told you a story from their childhood, you weren't grading their pacing. You were just... there. Feeling it. Learning from it.",
      },
      { type: 'pull', text: "The story disappears. The impact doesn't. That's the whole difference between good and great." },
      {
        type: 'p',
        text: "I think about the stories I still carry from childhood — a lesson from a teacher, something my parents told me at bedtime, a story passed around at a family dinner. I don't remember who told me half of them, or when. But I remember what they taught me. I remember how they made me feel. That's not an accident. It's culture doing what culture has always done. Long before advertising or publishing or Instagram, stories traveled by word of mouth — song, performance, conversation. In India, stories like the Ramayana and Mahabharata have survived thousands of years, not because they're old, but because they're honest about being human: duty, love, betrayal, consequence, purpose. Every generation reads them differently. That's exactly why they've lasted.",
      },
      {
        type: 'pull',
        text: 'A story that tells you what to think dies fast. A story that lets you find the meaning yourself? That one sticks around for centuries.',
      },
      {
        type: 'p',
        text: "Here's the part I think most people get wrong, especially in business: We remember feelings, not facts.",
      },
      {
        type: 'p',
        text: "You'll forget the stats from a presentation by next week. You won't forget the moment that actually moved you. A story doesn't just deliver information — it gives that information a reason to matter. That's why one good story beats a hundred good slides.",
      },
      {
        type: 'p',
        text: "And great storytelling isn't complicated. Some of the most powerful stories I know are painfully simple — a parent explaining a hard truth through something that happened to them, a founder explaining why they started the company, one honest sentence instead of ten clever ones. Clarity builds understanding. Emotion builds connection. Meaning builds memory. That's the whole formula, really.",
      },
      {
        type: 'p',
        text: "Which brings me to brands. So many companies talk endlessly about features and specs and roadmaps. But the brands people actually remember? They stand for something. People don't fall in love with a product. They fall in love with why it exists, who it's for, what it refuses to compromise on. Branding, at the end of the day, is just storytelling — sustained over time, told consistently enough that people start to believe it because it's true.",
      },
      {
        type: 'p',
        text: "I don't think about story structure when I think about the stories that shaped me. I think about what they left behind.",
      },
      {
        type: 'p',
        text: "That's the goal, I think. Not to impress anyone with the telling. Just to disappear into the story so completely that people stop noticing it's a story at all — and just carry it with them.",
      },
      {
        type: 'question',
        text: "So — what's a story that's stayed with you? From your childhood, your family, a book, a brand, anywhere. And why do you think it never left?",
      },
    ],
  },
];
