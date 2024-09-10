import Header from '@/components/blocks/header';
import WordMeaningTable from '@/components/ui/word-meaning-table';
import { getVideoDetails } from '@/lib/videoUtils';

export default async function VideoPage({ params }: { params: { videoId: string } }) {
  const video = await getVideoDetails(params.videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <main className="container mx-auto px-4">
      <Header title={video.title}/>
      <WordMeaningTable/> 
      
    </main>
  );
}