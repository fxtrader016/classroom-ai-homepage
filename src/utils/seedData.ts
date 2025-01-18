import { supabase } from '../lib/supabase';

const aiWebsites = [
  { title: 'ChatGPT', url: 'https://chat.openai.com', category: 'top' },
  { title: 'Claude', url: 'https://claude.ai', category: 'top' },
  { title: 'Google Bard', url: 'https://bard.google.com', category: 'good' },
  { title: 'Hugging Face', url: 'https://huggingface.co', category: 'top' },
  { title: 'Midjourney', url: 'https://www.midjourney.com', category: 'top' },
  { title: 'Stable Diffusion', url: 'https://stability.ai', category: 'good' },
  { title: 'Runway', url: 'https://runway.ml', category: 'good' },
  { title: 'Replicate', url: 'https://replicate.com', category: 'good' },
  { title: 'Perplexity AI', url: 'https://www.perplexity.ai', category: 'good' },
  { title: 'Anthropic', url: 'https://www.anthropic.com', category: 'medium' },
  { title: 'DeepMind', url: 'https://deepmind.com', category: 'medium' },
  { title: 'OpenAI', url: 'https://openai.com', category: 'top' },
  { title: 'Fast.ai', url: 'https://www.fast.ai', category: 'good' },
  { title: 'Weights & Biases', url: 'https://wandb.ai', category: 'good' },
  { title: 'Cohere', url: 'https://cohere.ai', category: 'medium' },
  { title: 'AI21 Labs', url: 'https://www.ai21.com', category: 'medium' },
  { title: 'Character.AI', url: 'https://character.ai', category: 'medium' },
  { title: 'Jasper', url: 'https://www.jasper.ai', category: 'meh' },
  { title: 'Copy.ai', url: 'https://www.copy.ai', category: 'meh' },
  { title: 'Synthesia', url: 'https://www.synthesia.io', category: 'medium' }
];

export async function seedAIWebsites() {
  try {
    const { error } = await supabase
      .from('websites')
      .insert(aiWebsites.map(website => ({
        ...website,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })));
    
    if (error) {
      console.error('Error seeding websites:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error seeding websites:', error);
    return false;
  }
}