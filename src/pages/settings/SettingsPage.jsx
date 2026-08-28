import styles from "./settingsPage.module.css"

import Button from "../../components/ui/button/Button"

import supabase from "../../utils/supabase"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function SettingsPage() {

    const { id } = useParams()
    const [profileSettings, setProfileSettings] = useState({})

    async function saveProfilleSettings() {
        // const { data, error } = await supabase.from("profiles")
        //     .upsert(profileSettings)
        //     .select()
        //     .single()

        // if (error) throw error

        localStorage.setItem("profileSettings", { profileSettings })
    }

    useEffect(() => {
        // const getSettings = async () => {
        //     const { data, error } = await supabase.from("profiles").select()

        //     if (error) throw error
        //     setProfileSettings(...data)
        // }
        // getSettings()

        const getSettings = () => {
            localStorage.getItem("profileSettings")
        }
        getSettings()

    }, [id])

    return (
        <section className={styles.settingsPage}>
            <div className={`container ${styles.settingsPageContainer}`}>

                <h2 className={styles.settingsPageTitle}>Налаштування профілю</h2>

                <ul className={`list ${styles.settingsList}`}>
                    <li className={styles.settingsItem}>
                        <h3>Спосіб відображення</h3>
                        <div className={styles.displayModSetting}>
                            <input className={`visually-hidden ${styles.displayModInput}`} onChange={(e) => { setProfileSettings({ ...profileSettings, displayMod: e.target.value }) }} checked={profileSettings.displayMod === 'grid'} type="radio" name="displayMod" value="grid" id="settings-grid" />
                            <label htmlFor="settings-grid" className={styles.displayModLabel}>
                                <span className={`${styles.gridVisualisationIcon} ${styles.visualisationIcon}`}>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                </span>
                                Сітка
                            </label>
                            <input className={styles.displayModInput} onChange={(e) => { setProfileSettings({ ...profileSettings, displayMod: e.target.value }) }} checked={profileSettings.displayMod === 'list'} type="radio" name="displayMod" value="list" id="settings-list" />
                            <label htmlFor="settings-list" className={styles.displayModLabel}>
                                <span className={`${styles.listVisualisationIcon} ${styles.visualisationIcon}`}>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                    <span className={styles.iconPart}></span>
                                </span>
                                Список
                            </label>
                        </div>
                    </li>


                </ul>

                <Button onClick={saveProfilleSettings}>Зберігти</Button>
            </div>
        </section >
    )
}