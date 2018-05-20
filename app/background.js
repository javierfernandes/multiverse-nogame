import { app, Menu } from 'electron'
import { devMenuTemplate } from './helpers/dev_menu_template'
import { editMenuTemplate } from './helpers/edit_menu_template'
import createWindow from './helpers/window'

import env from './env'

const setApplicationMenu = () => {
  const menus = [editMenuTemplate]
  if (env.name !== 'production') {
    menus.push(devMenuTemplate)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
}

app.on('ready', () => {
  setApplicationMenu()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  if (env.name !== 'production') {
    mainWindow.openDevTools()
  }
})

app.on('window-all-closed', () => { app.quit() })
