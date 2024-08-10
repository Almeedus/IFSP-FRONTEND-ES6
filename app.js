// app.js

const apiKey = '805d3a3c99ede71a192033bd32d79274';

const validatePhoneNumber = async (phoneNumber) => {
    try {
        const response = await fetch(`https://apilayer.net/api/validate?access_key=${apiKey}&number=${phoneNumber}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Verifique se a resposta tem a estrutura esperada
        if (data && data.valid !== undefined) {
            const { valid, country_code, location, carrier } = data;
            displayResult(valid, country_code, location, carrier);
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error fetching phone number data:', error);
        document.querySelector('#result').innerHTML = `Error fetching data: ${error.message}. Please try again.`;
    }
};

const displayResult = (valid, countryCode, location, carrier) => {
    const resultDiv = document.querySelector('#result');
    if (valid) {
        resultDiv.innerHTML = `
            <strong>Valid Number:</strong><br>
            Country Code: ${countryCode}<br>
            Location: ${location}<br>
            Carrier: ${carrier}
        `;
    } else {
        resultDiv.innerHTML = '<strong>Invalid Number</strong>';
    }
};

document.querySelector('#validate-btn').addEventListener('click', () => {
    const phoneNumber = document.querySelector('#phone-number').value;
    if (phoneNumber && isValidE164(phoneNumber)) {
        validatePhoneNumber(phoneNumber);
    } else {
        document.querySelector('#result').innerHTML = 'Please enter a valid phone number in E.164 format.';
    }
});

const isValidE164 = (number) => {
    const e164Pattern = /^\+\d{1,15}$/;
    return e164Pattern.test(number);
};
