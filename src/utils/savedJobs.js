const STORAGE_KEY = 'decode.savedJobSlugs';
const CHANGE_EVENT = 'decode:saved-jobs-change';

export const readSavedJobSlugs = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter((slug) => typeof slug === 'string') : [];
  } catch (error) {
    console.error('Unable to read saved Decode jobs:', error);
    return [];
  }
};

export const writeSavedJobSlugs = (slugs) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch (error) {
    console.error('Unable to save Decode jobs:', error);
    return false;
  }
};

export const savedJobsChangeEvent = CHANGE_EVENT;
