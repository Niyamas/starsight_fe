import sanitizeHtml from 'sanitize-html'
import normalStyles from '@/styles/components/blocks/RichText.module.scss'
import articleStyles from '@/styles/components/blocks/articles/RichText.module.scss'

export default function RichText({ html, type }) {

  return (
    <>
      {type === 'rich_text_block' ? (
        <div className={normalStyles['rich-text']}>
          <div
            className={normalStyles['content']}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
          />
        </div>
      ) : (
        <div
          className={articleStyles['rich-text']}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
      )}
    </>
  )
}