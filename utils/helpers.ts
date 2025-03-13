export async function fetchRetry(
  url: RequestInfo | URL,
  init?: RequestInit
): Promise<Boolean> {
  let retryLeft = 3;

  while (retryLeft > 0) {
    try {   
      const response = await fetch(url, init);
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {}
    retryLeft -= 1;
    await sleep(100 * (3 - retryLeft));
  }

  return false;
}

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
