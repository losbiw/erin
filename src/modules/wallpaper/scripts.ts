import { LinuxDistros } from '../../interfaces/Linux.d'

const linux = (imgPath: string): LinuxDistros => ({
    other: {
        set: `gsettings set org.gnome.desktop.background picture-uri 'file://${imgPath}'`,
        align: `gsettings set org.gnome.desktop.background picture-options 'zoom'`,
    },
    xfce: {
        set: `
          workspace_count=$(xfconf-query -v -c xfwm4 -p /general/workspace_count)
          connected_monitor=$(xrandr -q | awk '/ connected/{print $1}')
          xfce_desktop_prop_prefix=/backdrop/screen0/monitor$connected_monitor
          for ((i=1; i <= $workspace_count; i++))
          do
             xfconf-query -c xfce4-desktop -p $xfce_desktop_prop_prefix/workspace$i/last-image -s ${imgPath}
             xfconf-query -c xfce4-desktop -p $xfce_desktop_prop_prefix/workspace$i/image-style -s 5
          done
        `
    },
    kde: {
        set: `dbus-send --session --dest=org.kde.plasmashell --type=method_call /PlasmaShell org.kde.PlasmaShell.evaluateScript 'string:
                var Desktops = desktops();                                                                                                                       
                for (i=0;i<Desktops.length;i++) {
                        d = Desktops[i];
                        d.wallpaperPlugin = "org.kde.image";
                        d.currentConfigGroup = Array("Wallpaper",
                                                    "org.kde.image",
                                                    "General");
                        d.writeConfig("Image", "file://${imgPath}");
                }'`
    }
});

const macos = (imgPath: string) => `osascript -e 'tell application "System Events" to tell every desktop to set picture to "${imgPath}"'`;

export { linux, macos }