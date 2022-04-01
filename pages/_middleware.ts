import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME } from '@lib/constants';
import { getCurrentExperiment } from '@lib/optimize';
import { NextURL } from 'next/dist/server/web/next-url';

function withGeo(url: NextURL, req: NextRequest) {
  const { geo } = req

  const country = geo?.country || 'US';
  const city = geo?.city || 'San Francisco';
  const region = geo?.region || 'CA';

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);
  url.searchParams.set('region', region);

  return url;
}

function withExperiment(url: NextURL, req: NextRequest) {
  let res = NextResponse.next();
  let cookie = req.cookies[COOKIE_NAME];

  if (!cookie) {
    const experiment = getCurrentExperiment();
    if (!experiment) {
      return res;
    }
    let n = Math.random() * 100;
    const variant = experiment.variants.find((v, _) => {
      if (v.weight >= n) return true;
      n -= v.weight;
    });
    if (!variant) {
      return res;
    }

    cookie = `${experiment.name}.${variant.id}`;
  }

  const [experimentName, variantId] = cookie.split('.');
  url.searchParams.set(experimentName, variantId);

  res = NextResponse.rewrite(url);

  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, cookie);
  }

  return res;
}

export function middleware(req: NextRequest) {
  let url = req.nextUrl.clone();

  url = withGeo(url, req);
  return withExperiment(url, req);
}
