import googleLogo from '../assets/google-logo.png';
import sapLogo from '../assets/sap-logo.png';
import capgeminiLogo from '../assets/Capgemini Logo.jpeg';
import smartGuardianLogo from '../assets/SmartGuardianlogo.png';
import tripzyLogo from '../assets/Tripzylogo.png';
import cipherdocLogo from '../assets/logo_2.png';
import nutrixaLogo from '../assets/Nutrixa.png';
import githubLogo from '../assets/github.png';
import pythonLogo from '../assets/python.png';
import reactLogo from '../assets/react.svg';
import dockerLogo from '../assets/docker.png';
import sqlLogo from '../assets/sql.png';
import jsLogo from '../assets/javascript.png';
import javaLogo from '../assets/java.png';
import cppLogo from '../assets/C++.png';
import cloudLogo from '../assets/cloud.png';
import dbLogo from '../assets/database.png';
import nodeLogo from '../assets/node js.png';

export const resourceLogoMap = {
  google: googleLogo,
  sap: sapLogo,
  capgemini: capgeminiLogo,
  smartguardian: smartGuardianLogo,
  tripzy: tripzyLogo,
  cipherdoc: cipherdocLogo,
  nutrixa: nutrixaLogo,
  github: githubLogo,
  python: pythonLogo,
  react: reactLogo,
  docker: dockerLogo,
  postgresql: sqlLogo,
  sql: sqlLogo,
  javascript: jsLogo,
  java: javaLogo,
  cpp: cppLogo,
  cloud: cloudLogo,
  database: dbLogo,
  nodejs: nodeLogo,
};

export const getDomainFromUrl = (url) => {
  if (!url) return null;
  try {
    const raw = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    const parsed = new URL(raw);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

/**
 * Direct website logo fetcher:
 * Gets the company's real brand logo directly from their official domain.
 */
export const getCompanyLogoFromWebsite = (urlOrDomain, companyName = '') => {
  let domain = getDomainFromUrl(urlOrDomain);

  if (!domain && companyName) {
    const nameLower = companyName.toLowerCase();
    if (nameLower.includes('clearview')) domain = 'clearviewhcp.com';
    else if (nameLower.includes('google')) domain = 'google.com';
    else if (nameLower.includes('linux foundation')) domain = 'linuxfoundation.org';
    else if (nameLower.includes('major league') || nameLower.includes('mlh')) domain = 'mlh.io';
    else if (nameLower.includes('microsoft')) domain = 'microsoft.com';
    else if (nameLower.includes('sap')) domain = 'sap.com';
    else if (nameLower.includes('capgemini')) domain = 'capgemini.com';
    else if (nameLower.includes('amazon')) domain = 'amazon.com';
    else if (nameLower.includes('ibm')) domain = 'ibm.com';
    else if (nameLower.includes('salesforce')) domain = 'salesforce.com';
    else if (nameLower.includes('honeywell')) domain = 'honeywell.com';
    else if (nameLower.includes('pwc') || nameLower.includes('pricewaterhouse')) domain = 'pwc.com';
    else if (nameLower.includes('hsbc')) domain = 'hsbc.com';
    else if (nameLower.includes('standard chartered')) domain = 'sc.com';
    else if (nameLower.includes('meta')) domain = 'meta.com';
    else if (nameLower.includes('apple')) domain = 'apple.com';
    else if (nameLower.includes('netflix')) domain = 'netflix.com';
  }

  if (!domain) return null;

  return `https://unavatar.io/${domain}?fallback=https://www.google.com/s2/favicons?domain=${domain}%26sz=128`;
};

export const getResourceLogo = (logoKey, websiteUrl = null, companyName = null) => {
  // If a website URL or company name is provided, fetch authentic logo directly from their website
  if (websiteUrl || companyName) {
    const webLogo = getCompanyLogoFromWebsite(websiteUrl, companyName);
    if (webLogo) return webLogo;
  }

  if (!logoKey) return null;
  return resourceLogoMap[logoKey.toLowerCase()] || null;
};

export default resourceLogoMap;
