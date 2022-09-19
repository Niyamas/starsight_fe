import styles from '@/styles/components/blocks/articles/References.module.scss'

export default function References({ data }) {

  return (
    <div className={styles['references']}>
      <h3>References</h3>
      <ol>
        {data.references.map( (reference, index) => (
          <li key={index}>
            <a
              href={reference.url}
              target='_blank'
              rel='noreferrer'
            >
              {reference.reference}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}