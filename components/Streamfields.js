import {
  DetailedImage,
  References,
  RichText,
} from '@/components/blocks'

export default function Streamfields({ streams }) {
  let html = []

  streams.forEach(stream => {

    if (stream.type === 'detailed_image_block') {
      html.push(
        <DetailedImage key={stream.id} data={stream.value} />
      )
    }

    if (stream.type === 'references_block') {
      html.push(
        <References key={stream.id} data={stream.value} />
      )
    }

    if (stream.type === 'rich_text_block' || stream.type === 'article_rich_text_block') {
      html.push(
        <RichText key={stream.id} html={stream.value} type={stream.type} />
      )
    }
  })

  return html
}