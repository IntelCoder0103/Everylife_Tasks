import * as React from 'react';
import loadingSvg from "@/assets/loading.svg";
export default function Loading () {
  return <img src={loadingSvg} className="loading mx-auto" />;
}
