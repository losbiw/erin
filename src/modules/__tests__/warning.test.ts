import { ConfigUpdate, Mode } from '@interfaces/Config';
import warning from '../warning';

it('finds a warning', () => {
  const config: ConfigUpdate = {
    mode: Mode.Keywords,
    keywords: [],
  };

  const result = warning.match(config, false);

  expect(result).toEqual({
    name: 'keywords',
    value: 'You have to enter at least one keyword or change the mode',
  });
});
