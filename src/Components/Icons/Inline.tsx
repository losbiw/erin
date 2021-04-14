import React from 'react'

export default (props: { raw: string }) => {
    return <span dangerouslySetInnerHTML={{ __html: props.raw }} />
}