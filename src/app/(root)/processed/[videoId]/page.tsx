// import Header from '@/components/blocks/header';
// import WordMeaningTable from '@/components/ui/word-meaning-table';
// import { fetchVideoWords } from '@/app/actions/fetchVideoWords';
// import { getVideoDetails } from '@/lib/videoUtils';

// export default async function VideoPage({ params }: { params: { videoId: string } }) {
//   try {
//     // Fetch video details
//     const video = await getVideoDetails(params.videoId);

//     if (!video) {
//       return <div>Video not found</div>;
//     }

//     // Fetch word meanings
//     const { wordMeanings } = await fetchVideoWords(params.videoId);

//     return (
//       <main className="container mx-auto px-4">
//         <Header title={video.title} />
//         <WordMeaningTable initialWordMeanings={wordMeanings} />
//       </main>
//     );
//   } catch (error) {
//     // console.error('Error loading video page:', error);
//     return <div className='text-red-400'>Error loading video information. Please try again later.</div>;
//   }
// } 

import Header from '@/components/blocks/header';
import WordMeaningTable from '@/components/ui/word-meaning-table';
import { fetchVideoWords } from '@/app/actions/fetchVideoWords';
import { getVideoDetails } from '@/lib/videoUtils';

export default async function VideoPage({ params }: { params: { videoId: string } }) {
  try {
    // Fetch video details
    const video = await getVideoDetails(params.videoId);

    if (!video) {
      return <div>Video not found</div>;
    }

    // Fetch word meanings
    const { wordMeanings } = await fetchVideoWords(params.videoId);

    // Prepare content for Notion export
    const exportContent = wordMeanings.map(wm => `${wm.word}: ${wm.meaning}`).join('\n');

    return (
      <main className="container mx-auto px-4">
        <Header title={video.title} content={exportContent} />
        <WordMeaningTable initialWordMeanings={wordMeanings} />
      </main>
    );
  } catch (error) {
    return <div className='text-red-400'>Error loading video information. Please try again later.</div>;
  }
}