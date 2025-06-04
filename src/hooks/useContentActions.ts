import { useState } from 'react';
import { useAlert } from '../context/AlertContext';

export const useContentActions = () => {
  const { showAlert } = useAlert();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = (initialLikes: number) => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? initialLikes : initialLikes + 1);
    showAlert('success', isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = async (title: string, description: string) => {
    try {
      await navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
      showAlert('success', 'Shared successfully');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showAlert('error', 'Failed to share content');
      }
    }
  };

  return {
    isLiked,
    likesCount,
    handleLike,
    handleShare
  };
};
