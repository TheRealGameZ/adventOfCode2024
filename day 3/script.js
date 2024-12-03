const regex = /mul\(\d+,\d+\)/g;

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    let countValue = 0;
    let mulEnabled = true; 
    
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const fileContent = e.target.result;
        const lines = fileContent.split(/(?=do\(\)|don't\(\)|mul\(\d+,\d+\))/);
        
        lines.forEach(line => {
            if (line.includes("don't()")) {
                mulEnabled = false;
            } else if (line.includes("do()")) {
                mulEnabled = true;
            } else if (mulEnabled && regex.test(line)) {
                const matches = line.match(regex);
                matches.forEach(value => {
                    const numbers = value.match(/\d+/g);
                    const firstNumber = parseInt(numbers[0], 10);
                    const secondNumber = parseInt(numbers[1], 10);
                    countValue += firstNumber * secondNumber;
                });
            }
        });

        console.log(countValue);
    };

    reader.readAsText(file);
});
