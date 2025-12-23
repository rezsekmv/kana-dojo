'use client';
import { Link, useRouter, usePathname } from '@/core/i18n/routing';
import {
  BookOpen,
  Brain,
  CloudRain,
  House,
  Keyboard,
  Languages,
  Leaf,
  Sparkles,
  Star,
  Trophy,
  Volume2,
  Wind
} from 'lucide-react';
import clsx from 'clsx';
import { useClick } from '@/shared/hooks/useAudio';
import { useEffect, useRef } from 'react';
import usePreferencesStore from '@/features/Preferences/store/usePreferencesStore';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);

  const hotkeysOn = usePreferencesStore(state => state.hotkeysOn);

  const { playClick } = useClick();

  const escButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!hotkeysOn) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in form elements
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'Escape') {
        escButtonRef.current?.click();
      } else if (event.key.toLowerCase() === 'h') {
        router.push('/');
      } else if (event.key.toLowerCase() === 'p') {
        router.push('/preferences');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotkeysOn, router]);

  return (
    <div
      id='main-sidebar'
      className={clsx(
        'flex lg:flex-col lg:items-start lg:gap-2',
        'lg:sticky lg:top-0 lg:h-screen lg:w-1/5 lg:overflow-y-auto',
        'lg:pt-6',
        'max-lg:fixed max-lg:bottom-0 max-lg:w-full',
        'max-lg:bg-[var(--card-color)]',
        'z-50',
        'border-[var(--border-color)] max-lg:items-center max-lg:justify-evenly max-lg:border-t-2 max-lg:py-2',
        'lg:h-auto lg:border-r-1 lg:px-3',
        'lg:pb-12'
      )}
    >
      <h1
        className={clsx(
          'flex items-center gap-1.5 pl-4 text-3xl',
          'max-3xl:flex-col max-3xl:items-start max-lg:hidden'
        )}
      >
        <span className='font-bold'>KanaDojo</span>
        <span className={clsx('font-normal text-[var(--secondary-color)]')}>
          かな道場️
        </span>
      </h1>
      <Link
        href='/'
        className={clsx(
          'flex items-center gap-2 rounded-xl text-2xl transition-all duration-250 max-lg:justify-center max-lg:p-3 lg:w-full lg:px-4 lg:py-2',
          pathWithoutLocale === '/'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <House className='' />
        <span className='max-lg:hidden'>Home</span>
      </Link>
      <Link
        href='/progress'
        className={clsx(
          'flex items-center gap-2 rounded-xl text-2xl transition-all duration-250 max-lg:justify-center max-lg:px-3 max-lg:py-2 lg:w-full lg:px-4 lg:py-2',
          pathWithoutLocale === '/progress'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Trophy />
        <span className='max-lg:hidden'>Progress</span>
      </Link>
      <Link
        href='/kana'
        className={clsx(
          'flex items-center gap-2 rounded-xl text-2xl transition-all duration-250 max-lg:justify-center max-lg:px-3 max-lg:py-2 lg:w-full lg:px-4 lg:py-2',
          pathWithoutLocale === '/kana'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        あ<span className='max-lg:hidden'>Kana</span>
      </Link>

      <Link
        href='/vocabulary'
        className={clsx(
          'flex items-center gap-2 rounded-xl text-2xl transition-all duration-250 max-lg:justify-center max-lg:px-3 max-lg:py-2 lg:w-full lg:px-4 lg:py-2',
          pathWithoutLocale === '/vocabulary'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        語<span className='max-lg:hidden'> Vocabulary</span>
      </Link>

      <Link
        href='/kanji'
        className={clsx(
          'flex items-center gap-2 rounded-xl text-2xl transition-all duration-250 max-lg:justify-center max-lg:px-3 max-lg:py-2 lg:w-full lg:px-4 lg:py-2',
          pathWithoutLocale === '/kanji'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        字<span className='max-lg:hidden'> Kanji</span>
      </Link>
      <Link
        href='/preferences'
        className={clsx(
          'flex items-center gap-2 rounded-xl text-2xl transition-all duration-250 max-lg:justify-center max-lg:px-3 max-lg:py-2 lg:w-full lg:px-4 lg:py-2',
          pathWithoutLocale === '/preferences'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Sparkles
          // size={32}
          className={clsx(
            'shrink-0',
            pathWithoutLocale !== '/preferences' && 'motion-safe:animate-bounce'
          )}
        />
        <span className='max-lg:hidden'>Preferences</span>
      </Link>

      <div className='mt-3 w-full px-4 text-xs text-[var(--main-color)] uppercase opacity-70 max-lg:hidden'>
        Academy
      </div>
      <Link
        href='/academy'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/academy'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <BookOpen className='shrink-0' />
        <span>Guides</span>
      </Link>

      <div className='mt-3 w-full px-4 text-xs text-[var(--main-color)] uppercase opacity-70 max-lg:hidden'>
        Tools
      </div>
      <Link
        href='/translate'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/translate'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Languages className='shrink-0' />
        <span>Translate</span>
      </Link>

      <div className='mt-3 w-full px-4 text-xs text-[var(--main-color)] uppercase opacity-70 max-lg:hidden'>
        Experiments
      </div>
      <Link
        href='/experiments'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Sparkles className='shrink-0' />
        <span>All Experiments</span>
      </Link>
      <Link
        href='/zen'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/zen'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Leaf className='shrink-0' />
        <span>Zen Mode</span>
      </Link>
      <Link
        href='/experiments/breathing'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/breathing'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Wind className='shrink-0' />
        <span>Breathing</span>
      </Link>
      <Link
        href='/experiments/ambient'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/ambient'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Sparkles className='shrink-0' />
        <span>Ambient</span>
      </Link>
      <Link
        href='/experiments/rain'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/rain'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <CloudRain className='shrink-0' />
        <span>Kana Rain</span>
      </Link>
      <Link
        href='/experiments/sound'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/sound'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Volume2 className='shrink-0' />
        <span>Sound Garden</span>
      </Link>
      <Link
        href='/experiments/haiku'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/haiku'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <BookOpen className='shrink-0' />
        <span>Haiku Garden</span>
      </Link>
      <Link
        href='/experiments/constellation'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/constellation'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Star className='shrink-0' />
        <span>Constellation</span>
      </Link>
      <Link
        href='/experiments/typing'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/typing'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Keyboard className='shrink-0' />
        <span>Speed Typing</span>
      </Link>
      <Link
        href='/experiments/memory'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/experiments/memory'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        <Brain className='shrink-0' />
        <span>Memory Palace</span>
      </Link>
      <Link
        href='/calligraphy'
        className={clsx(
          'flex w-full items-center gap-2 rounded-xl px-4 py-2 text-xl transition-all duration-250 max-lg:hidden',
          pathWithoutLocale === '/calligraphy'
            ? 'bg-[var(--border-color)] text-[var(--main-color)] lg:bg-[var(--card-color)]'
            : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
        )}
        onClick={playClick}
      >
        書<span> Calligraphy</span>
      </Link>
    </div>
  );
};

export default Sidebar;
