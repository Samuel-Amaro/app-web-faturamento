import { useEffect, useState } from "react";

type PropsUseMatchMedia = {
  mobileContent: JSX.Element | null;
  desktopContent: JSX.Element | null;
  mediaQuery: string;
};

//trabalhar nesse hook como se fosse um mobile-frist, mobile primeiro depois desktop
//a media query tem que ser para corresponder desktop
//a mobile vai ser natural
export default function useMatchMedia({
  mobileContent,
  desktopContent,
  mediaQuery,
}: PropsUseMatchMedia) {
  const [isScreenCurrentMatch, setIsScreenCurrentMatch] = useState(false);

  useEffect(() => {
    const mediaWatcher = window.matchMedia(mediaQuery);
    setIsScreenCurrentMatch(mediaWatcher.matches);

    function updateIsScreenCurrentMatch(e: MediaQueryListEvent) {
      setIsScreenCurrentMatch(e.matches);
    }

    //navegadores como chrome, opera, firefox, etc...
    if (mediaWatcher.addEventListener) {
      mediaWatcher.addEventListener("change", updateIsScreenCurrentMatch);
      return function cleanup() {
        mediaWatcher.removeEventListener("change", updateIsScreenCurrentMatch);
      };
    } else {
      //safari
      mediaWatcher.addListener(updateIsScreenCurrentMatch);
      return function cleanup() {
        mediaWatcher.removeListener(updateIsScreenCurrentMatch);
      };
    }
  }, [mediaQuery]);

  return isScreenCurrentMatch ? desktopContent : mobileContent;
}
