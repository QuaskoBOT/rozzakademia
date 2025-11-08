// --- 1. Dynamiczne liczniki (Symulacja pobierania danych) ---

// Docelowe wartości (zmienne, które będą pobrane z Twojego API w przyszłości)
const targetServers = 13579;
const targetUsers = 879432;
const duration = 2000; // Czas animacji w milisekundach

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    
    // Użyj Number.toLocaleString('en-US') dla separatora tysięcy (13,579)
    const formatter = new Intl.NumberFormat('en-US'); 

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        // Zaktualizuj wartość z formatowaniem
        obj.innerHTML = formatter.format(currentValue);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Upewnij się, że na koniec jest ustawiona dokładnie docelowa wartość
            obj.innerHTML = formatter.format(end); 
        }
    };
    window.requestAnimationFrame(step);
}

// Uruchomienie animacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    animateValue("stat-servers", 0, targetServers, duration);
    animateValue("stat-users", 0, targetUsers, duration);
    
    // --- 2. Panel Komend (Interaktywne karty) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const commandLists = document.querySelectorAll('.command-list');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Usuń klasę 'active' ze wszystkich przycisków i treści
            tabButtons.forEach(btn => btn.classList.remove('active'));
            commandLists.forEach(list => list.classList.remove('active-content'));

            // Dodaj klasę 'active' do klikniętego przycisku
            button.classList.add('active');

            // Pokaż odpowiednią listę komend (zgodnie z data-category)
            const targetList = document.querySelector(`.command-list[data-content="${category}"]`);
            if (targetList) {
                targetList.classList.add('active-content');
            }
        });
    });
});