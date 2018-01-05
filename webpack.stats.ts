import * as common from './webpack.common';
import * as merge from 'webpack-merge';
import { production } from './webpack.prod';

import * as WebpackMonitor from 'webpack-monitor';

export default merge(common, production, {
  plugins: [
    new WebpackMonitor({
      launch: true,
      target: './stats.json'
    })
  ]
});
