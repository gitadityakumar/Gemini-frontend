import { getVideoDetails } from '@/lib/videoUtils';

export default async function VideoPage({ params }: { params: { videoId: string } }) {
  const video = await getVideoDetails(params.videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">{video.title}</h1>
      {/* Add more video details and content here */}
    </div>
  );
}