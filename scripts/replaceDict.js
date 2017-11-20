module.exports = {
    'Russian Federation': 'Russia',
    'Congo, Dem. Rep.': 'Dem. Rep. Congo',
    'Dem. Rep. of the Congo': 'Dem. Rep. Congo',
    'Bahamas, The': 'Bahamas',
    'Bosnia and Herzegovina': 'Bosnia and Herz.',
    'Brunei Darussalam': 'Brunei',
    'Bolivia (Plurinational State of)': 'Bolivia',
    'Central African Republic': 'Central African Rep.',
    'Côte d\'Ivoire': 'Cote d\'Ivoire',
    'Congo, Rep.': 'Congo',
    'Czech Republic': 'Czechia',
    'Czech Rep.': 'Czechia',
    'Dominican Republic': 'Dominican Rep.',
    'Egypt, Arab Rep.': 'Egypt',
    'Gambia, The': 'Gambia',
    'Equatorial Guinea': 'Eq. Guinea',
    'Iran, Islamic Rep.': 'Iran',
    'Iran (Islamic Rep. of)': 'Iran',
    'Kyrgyz Republic': 'Kyrgyzstan',
    'Korea, Rep.': 'South Korea',
    'Rep. of Korea': 'South Korea',
    'Dem. People\'s South Korea': 'South Korea',
    'Lao PDR': 'Laos',
    'Macedonia, FYR': 'Macedonia',
    'The former Yugoslav Republic of Macedonia': 'Macedonia',
    'Korea, Dem. People�s Rep.': 'North Korea',
    'Korea, Dem. People\'s Rep.': 'North Korea',
    'West Bank and Gaza': 'Palestine',
    'Solomon Islands': 'Solomon Is.',
    'South Sudan': 'S. Sudan',
    'Slovak Republic': 'Slovakia',
    'Syrian Arab Republic': 'Syria',
    'Syrian Arab Rep.': 'Syria',
    'Venezuela, RB': 'Venezuela',
    'Yemen, Rep.': 'Yemen',
    'Serbia and Kosovo (S/RES/1244 (1999))': 'Kosovo',
    'Viet Nam': 'Vietnam',
    'United Rep. of Tanzania': 'Tanzania',
    'Rep. of Moldova': 'Moldova',
    'Venezuela (Bolivarian Republic of)': 'Venezuela',
    'United States of America': 'United States'
};

// Countries we do not have on our map... these are probably
// micro-countries or colonies or some bigger unions
const countriesWeDontHave = [
    'Aruba',
    'Andorra',
    'Arab World',
    'American Samoa',
    'Antigua and Barbuda',
    'Bahrain',
    'Bermuda',
    'Barbados',
    'Central Europe and the Baltics',
    'Channel Islands',
    'Comoros',
    'Cabo Verde',
    'Caribbean small states',
    'Curacao',
    'Cayman Islands',
    'Dominica',
    'East Asia & Pacific (excluding high income)',
    'Early-demographic dividend',
    'East Asia & Pacific',
    'Europe & Central Asia (excluding high income)',
    'Europe & Central Asia',
    'Euro area',
    'European Union',
    'Fragile and conflict affected situations',
    'Faroe Islands',
    'Micronesia, Fed. Sts.',
    'Gibraltar',
    'Grenada',
    'Guam',
    'High income',
    'Hong Kong SAR, China',
    'Heavily indebted poor countries (HIPC)',
    'IBRD only',
    'IDA & IBRD total',
    'IDA total',
    'IDA blend',
    'IDA only',
    'Isle of Man',
    'Kiribati',
    'St. Kitts and Nevis',
    'Latin America & Caribbean (excluding high income)',
    'St. Lucia',
    'Latin America & Caribbean',
    'Least developed countries: UN classification',
    'Low income',
    'Lower middle income',
    'Low & middle income',
    'Late-demographic dividend',
    'Middle East & North Africa',
    'Middle income',
    'Middle East & North Africa (excluding high income)',
    'North America',
    'OECD members',
    'Other small states',
    'Pre-demographic dividend',
    'Post-demographic dividend',
    'South Asia',
    'Sub-Saharan Africa (excluding high income)',
    'Sub-Saharan Africa',
    'Small states',
    'East Asia & Pacific (IDA & IBRD countries)',
    'Europe & Central Asia (IDA & IBRD countries)',
    'Latin America & the Caribbean (IDA & IBRD countries)',
    'Middle East & North Africa (IDA & IBRD countries)',
    'South Asia (IDA & IBRD)',
    'Sub-Saharan Africa (IDA & IBRD countries)',
    'Upper middle income',
    'World',
    'Not classified',
    'Liechtenstein',
    'Macao SAR, China',
    'Monaco',
    'St. Martin (French part)',
    'Maldives',
    'Malta',
    'Marshall Islands',
    'Northern Mariana Islands',
    'Mauritius',
    'Pacific island small states',
    'Nauru',
    'Palau',
    'French Polynesia',
    'Singapore',
    'San Marino',
    'Sao Tome and Principe',
    'Sint Maarten (Dutch part)',
    'Seychelles',
    'Turks and Caicos Islands',
    'Tonga',
    'Tuvalu',
    'St. Vincent and the Grenadines',
    'British Virgin Islands',
    'Virgin Islands (U.S.)',
    'Samoa'
];

// Following list contains names we use in our app
// It's here as a reference.

const countryNames = [
  'Afghanistan',
  'Angola',
  'Albania',
  'United Arab Emirates',
  'Argentina',
  'Armenia',
  'Fr. S. Antarctic Lands',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Burundi',
  'Belgium',
  'Benin',
  'Burkina Faso',
  'Bangladesh',
  'Bulgaria',
  'Bahamas',
  'Bosnia and Herz.',
  'Belarus',
  'Belize',
  'Bolivia',
  'Brazil',
  'Brunei',
  'Bhutan',
  'Botswana',
  'Central African Rep.',
  'Canada',
  'Switzerland',
  'Chile',
  'China',
  'Côte d\'Ivoire',
  'Cameroon',
  'Dem. Rep. Congo',
  'Congo',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'N. Cyprus',
  'Cyprus',
  'Czechia',
  'Germany',
  'Djibouti',
  'Denmark',
  'Dominican Rep.',
  'Algeria',
  'Ecuador',
  'Egypt',
  'Eritrea',
  'Spain',
  'Estonia',
  'Ethiopia',
  'Finland',
  'Fiji',
  'Falkland Is.',
  'France',
  'Gabon',
  'United Kingdom',
  'Georgia',
  'Ghana',
  'Guinea',
  'Gambia',
  'Guinea-Bissau',
  'Eq. Guinea',
  'Greece',
  'Greenland',
  'Guatemala',
  'Guyana',
  'Honduras',
  'Croatia',
  'Haiti',
  'Hungary',
  'Indonesia',
  'India',
  'Ireland',
  'Iran',
  'Iraq',
  'Iceland',
  'Israel',
  'Italy',
  'Jamaica',
  'Jordan',
  'Japan',
  'Kazakhstan',
  'Kenya',
  'Kyrgyzstan',
  'Cambodia',
  'South Korea',
  'Kosovo',
  'Kuwait',
  'Laos',
  'Lebanon',
  'Liberia',
  'Libya',
  'Sri Lanka',
  'Lesotho',
  'Lithuania',
  'Luxembourg',
  'Latvia',
  'Morocco',
  'Moldova',
  'Madagascar',
  'Mexico',
  'Macedonia',
  'Mali',
  'Myanmar',
  'Montenegro',
  'Mongolia',
  'Mozambique',
  'Mauritania',
  'Malawi',
  'Malaysia',
  'Namibia',
  'New Caledonia',
  'Niger',
  'Nigeria',
  'Nicaragua',
  'Netherlands',
  'Norway',
  'Nepal',
  'New Zealand',
  'Oman',
  'Pakistan',
  'Panama',
  'Peru',
  'Philippines',
  'Papua New Guinea',
  'Poland',
  'Puerto Rico',
  'North Korea',
  'Portugal',
  'Paraguay',
  'Palestine',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'W. Sahara',
  'Saudi Arabia',
  'Sudan',
  'S. Sudan',
  'Senegal',
  'Solomon Is.',
  'Sierra Leone',
  'El Salvador',
  'Somaliland',
  'Somalia',
  'Serbia',
  'Suriname',
  'Slovakia',
  'Slovenia',
  'Sweden',
  'Swaziland',
  'Syria',
  'Chad',
  'Togo',
  'Thailand',
  'Tajikistan',
  'Turkmenistan',
  'Timor-Leste',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Taiwan',
  'Tanzania',
  'Uganda',
  'Ukraine',
  'Uruguay',
  'United States of America',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Vanuatu',
  'Yemen',
  'South Africa',
  'Zambia',
  'Zimbabwe'
];
