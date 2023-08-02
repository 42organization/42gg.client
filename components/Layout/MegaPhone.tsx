import { useState, useEffect } from 'react';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/Layout/Megaphone.module.scss';

interface MegaphoneContent {
    megaphoneId: number;
    content: string;
    intraId: string;
}

interface MegaphoneList {
    megaphoneList: Array<MegaphoneContent>;
}

const defaultContents: MegaphoneList = {
    megaphoneList: [
        {
            megaphoneId: 1,
            content: '문구를 입력해주세요',
            intraId: 'admin',
        },
    ]
}

const Megaphone = () => {
    const [contents, setContents] = useState<MegaphoneList>(defaultContents);
    const [play, setPlay] = useState('running');
    
    
    // api 호출해서 내용 받기
    const getMegaphoneHandler = useAxiosGet({
        url: `'http://localhost:3000/api/pingpong/megaphones`,
        setState: setContents,
        err: 'HJ01',
        type: 'setError'
    })

    useEffect(() => {
        getMegaphoneHandler();
    }, []);
    
    
    const clickPause = () => {
        if (play === 'pause') {
            setPlay('running');
        } else {
            setPlay('pause');
            setTimeout(() => setPlay('running'), 5000);
        }
    }
    
    const pauseStyle: {[key: string]: string} = {
        pause: styles.pause,
        running: styles.running,
    };

    return (
        <div className={styles.rollingBanner}
        onClick={() => clickPause()}>
            <div className={styles.wrapper}>
                <ul className={`${styles.megaphoneContents} ${pauseStyle[play]}`}>
                    {contents.megaphoneList.map((content, idx) => (
                            <li key={idx}>{content.intraId} {content.content} &nbsp;&nbsp;</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Megaphone;