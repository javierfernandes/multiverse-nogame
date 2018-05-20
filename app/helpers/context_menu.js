// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

(function () {
    'use strict';

    const { remote } = require('electron')
    const { Menu, MenuItem } = remote.Menu

    const isAnyTextSelected = () => window.getSelection().toString() !== ''

    const commandMenuItem = (label, command) => new MenuItem({
      label,
      click: () => { document.execCommand(command) }
    })

    const cut = commandMenuItem('Cut', 'cut')
    const cut = commandMenuItem('Copy', 'copy')
    const cut = commandMenuItem('Paste', 'paste')

    const normalMenu = new Menu()
    normalMenu.append(copy)

    const textEditingMenu = new Menu()
    textEditingMenu.append(cut)
    textEditingMenu.append(copy)
    textEditingMenu.append(paste)

    document.addEventListener('contextmenu', e => {
      switch (e.target.nodeName) {
        case 'TEXTAREA':
        case 'INPUT':
          e.preventDefault()
          textEditingMenu.popup(remote.getCurrentWindow())
          break
        default:
          if (isAnyTextSelected()) {
            e.preventDefault()
            normalMenu.popup(remote.getCurrentWindow())
          }
      }
    }, false)

}())
