import { useState, useEffect } from 'react';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/Layout/MegaPhone.module.scss';


interface MegaphoneContent {
    megaphoneId: number;
    content: string;
    intraId: string;
}

type MegaphoneList = Array<MegaphoneContent>;

const Megaphone = () => {

    const defaultContents: MegaphoneList = [
        {
            megaphoneId: 1,
            content: 'test1',
            intraId: 'hyungjpa',
        },
        {
            megaphoneId: 2,
            content: 'test2',
            intraId: 'hyungjpa2',
        },

    ]
    // api 호출해서 내용 받기
    const [contents, setContents] = useState<MegaphoneList>(defaultContents);

    const getMegaphoneHandler = useAxiosGet({
        url: `/pingpong/megaphones`,
        setState: setContents,
        err: 'HJ01',
        type: 'setError'
    })

    // useEffect(() => {
    //     getMegaphoneHandler();
    // }, []);

    return (
        <div className={styles.rollingBanner}>
            <div className={styles.wrapper}>
                <div className={styles.megaPhoneContent}>
                    <ul>
                        {contents.map((content, idx) => (
                            <>
                                <li key={idx}>{content.intraId} {content.content}</li>
                                <li key={idx}>&nbsp;</li>
                            </>
                        ))}
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Megaphone;