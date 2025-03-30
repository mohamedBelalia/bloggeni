
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const items = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "Effortless AI-Powered Article Creation",
    description:
      "Generate high-quality, SEO-optimized content with just one click. Our AI handles keyword research, long-form writing, images, and metadata for you!",
  },
  {
    id: 2,
    date: "Mar 22, 2024",
    title: "Boost Your SEO Without Backlinks",
    description:
     "Struggling with backlinks? No problem! Our AI crafts compelling, authoritative content that ranks high on search engines—no backlinks required!",
  },
  {
    id: 3,
    date: "Apr 5, 2024",
    title: "Maximize Your Website’s Revenue",
    description:
      "Drive more organic traffic, improve conversions, and grow your business effortlessly with AI-driven, high-ranking content.",
  },
]

export default function TimeLine() {
  return (
    <Timeline defaultValue={3}>
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="group-data-[orientation=vertical]/timeline:ms-10"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
            {/* <TimelineDate>{item.date}</TimelineDate> */}
            <TimelineTitle className="ml-4 text-2xl text-[#652293]">{item.title}</TimelineTitle>
            <TimelineIndicator className="!bg-[#652293] text-xl group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-10 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
              <span>{item.id}</span>
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent className="ml-4 text-base text-gray-800 mt-1">{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
