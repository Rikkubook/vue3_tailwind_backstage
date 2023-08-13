import Link from '@tiptap/extension-link'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { getAttributes } from '@tiptap/core'

export default function(editorEvent) {
  return Link.configure({
    openOnClick: false, // 預防編輯時自動打開
  }).extend({ // 處理切換連結時問題
    addProseMirrorPlugins(){
      return[
        new Plugin({
          key: new PluginKey('handleEmitSelectLinkEvent'),
          props: {
            handleClick: (view, pos, event) => {
              const attrs = getAttributes(view.state,'link')
              const link = event.target.closest('a')

              const href = link?.href ?? attrs.href
              const target = link?.target ?? attrs.target

              if (link && href) {
                editorEvent.emit('link-selected', attrs)
                return true
              }

              return false
            },
          },
        })
      ]
    }
  })
}