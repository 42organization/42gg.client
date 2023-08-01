import styles from 'styles/Layout/MegaPhone.module.scss';


const MegaPhone = () => {

    // api 호출해서 내용 받기


    return (
        <div className={styles.rollingBanner}>
            <div className={styles.wrapper}>
                <div className={styles.megaPhoneContent}>
                    <ul>
                        <li>
                            hyungjpa: 테스트 중
                        </li>
                        <li>
                            &nbsp;&nbsp;
                        </li>
                        <li>
                            hyungjpa2: 테스트 중
                        </li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default MegaPhone;