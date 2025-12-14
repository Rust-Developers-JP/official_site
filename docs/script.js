document.addEventListener("DOMContentLoaded", async () => {
    try {
        const box = document.getElementById("news_box");
        if (box) box.textContent = ""; 

        const res = await fetch("https://api.kotoca.net/get?ch=news");
        if (!res.ok) throw new Error("Fetch失敗: " + res.status);

        const data = await res.json();
        console.log("お知らせデータ取得:", data);

        // ▼▼▼ ここで3件に制限 ▼▼▼
        const limited = data.slice(0, 3);

        if (box) {
            limited.forEach((entry, index) => {
                const date = new Date(entry.createdAt).toLocaleString();

                const lines = entry.content.split('\n');
                let titleLineIndex = lines.findIndex(line => line.startsWith('# '));
                if (titleLineIndex === -1) titleLineIndex = 0;
                const title = lines[titleLineIndex].replace(/^#\s*/, '');
                const bodyLines = lines.slice(titleLineIndex + 1);
                const body = bodyLines.join('\n');

                const pDate = document.createElement("p");
                pDate.textContent = date;

                const h3 = document.createElement("h3");
                h3.textContent = title;
                h3.style.cursor = "pointer";

                const divBody = document.createElement("div");
                divBody.textContent = body;
                divBody.style.boxShadow = "none";
                divBody.style.border = "none";
                divBody.style.display = "none";
                divBody.style.whiteSpace = "pre-wrap";

                h3.addEventListener("click", () => {
                    divBody.style.display = divBody.style.display === "none" ? "block" : "none";
                });

                box.appendChild(pDate);
                box.appendChild(h3);
                box.appendChild(divBody);

                if (index !== limited.length - 1) {
                    const hr = document.createElement("hr");
                    box.appendChild(hr);
                }
            });
        }
    } catch (err) {
        console.error("お知らせ読み込みでエラー:", err);
        const box = document.getElementById("news_box");
        if(box) box.textContent = "お知らせの読み込み中にエラーが発生しました。";
    }
});

//
//  とりあえずAIに改装中ですを表示させるコードを書かせた
//

document.addEventListener('DOMContentLoaded', () => {
    // すでに「表示しない」が保存されていたら何もしない
    if (localStorage.getItem('hideMaintenanceOverlay') === 'true') {
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'maintenanceOverlay';

    const message = document.createElement('div');
    message.textContent = '現在改装中です';

    const buttons = document.createElement('div');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '閉じる';

    const neverBtn = document.createElement('button');
    neverBtn.textContent = '二度と表示しない';

    overlay.appendChild(message);
    overlay.appendChild(buttons);
    buttons.appendChild(closeBtn);
    buttons.appendChild(neverBtn);

    Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0,0,0,0.85)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
        zIndex: '9999',
        padding: '1rem',
        boxSizing: 'border-box',
        gap: '1.5rem',
        textAlign: 'center'
    });

    Object.assign(buttons.style, {
        display: 'flex',
        gap: '1rem'
    });

    Object.assign(closeBtn.style, neverBtn.style = {
        fontSize: '1rem',
        padding: '0.6rem 1.2rem',
        cursor: 'pointer'
    });

    document.body.appendChild(overlay);

    // 閉じる（次回は表示される）
    closeBtn.onclick = () => {
        overlay.remove();
    };

    // 二度と表示しない
    neverBtn.onclick = () => {
        localStorage.setItem('hideMaintenanceOverlay', 'true');
        overlay.remove();
    };
});

