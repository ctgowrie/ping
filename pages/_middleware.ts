import { NextRequest, NextResponse } from 'next/server'
import countries from '../lib/countries.json'

export function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req

  const country = geo?.country || 'US';
  const city = geo?.city || 'San Francisco';
  const region = geo?.region || 'CA';

  const countryInfo = countries.find((x) => x.cca2 === country);
  if (!countryInfo) {
    return;
  }

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);
  url.searchParams.set('region', region);

  return NextResponse.rewrite(url);
}