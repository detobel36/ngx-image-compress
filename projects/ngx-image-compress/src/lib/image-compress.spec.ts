import { ImageCompress } from './image-compress';
import { DOC_ORIENTATION } from './models/DOC_ORIENTATION';

const ANGULAR_LOGO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAdCAYAAAC5UQwxAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAO+SURBVEiJlVZNSxtdFH7unbGJxaRX6rvRJELAHyBIaWjBnYsKkkJ3rhrRRRcJ7cZV6d5FV0WK1kWh0IUL7aZLwW0NFfoDSkwKUkFvEj/yNTPPu5gYE5LMTA8cuDP3nOc598y5Zw7oIc75Oavv3/MmlWJdStaBwSolb1IpWh8/0jk/94Ik+t7UarR3d9lMp9kIhQYTGIarA/YaoRCb6TSt3V06tdoQQtumfXDA1soKG0oNP0lbrxcXeb246GvXUIqtlRXaBwekbZMkhZ3P03r+HCyVEFSa378DAO49exbYR8TjGNnfhynIfyJzZmdhp1KdtTw+DuTHUglwHEjE44HJAMB69WrgOpDE4xB0HDbu3wfqdX+HWAy1n8fAiNlmtDA6Owv8+ePvGw4jdHMDWa5UwMnJQAGa2SzUfxNQSrk6MQEzmw3ky8lJlCsVSABwpqb8PcbGYKyuAgCcw0M4h4cAALm6ChGJ+LrfckgAQCzm62BkMoBSAAB7cxP25iYAQCgF+fKlf8BtjmAnNAyYuZy7Pj2Fs7cHZ28PPD11t3M5wDA8IXpOSB9CubQEJJMAAGtrC2i1gFYL9tYWAEAkkzDSae+gYzEIiDahT0qNN2/chWXB2d6+i3p7G7As1+b1a08MZ2oKBGHePgwT+egR5NOnrlM+DyQSEInEHVA+D/n4McSTJ+DcHEQ+P5QQAKC1pi4WWRdiYD+0v3717P7dUtnZGdxXhaAuFqm1plulkQgYjfZFxVgM8sULz1T1nGJpCRzQuRiNAu2rY3bexmJApdJjaK2tAaZrYn/4AP74MZBIzM3ByGYB04S1toaRt297DbprRGvNsi7zemGhNw2RCHWh4Obq8pKNaHT4r2hsjE6lQq01LwqFPtvrhQVqrd2UKqXwQD3AvXbZ34qRyUBNT6NcLuNyZwesVofn8uoKV58+QSmF8elpyEymZ3skmey0Q9lJS1flwTDcy9wW8/Pn4WQDbIxcrvMpAEB2Yd+97frYIpGA8+2bG93fv4H+efLXL9jv3gHj4x0M/v7dh92ZaZxqla31dTZGR31Hh6DaGB1la32dTrXqMUSdnLC1vOw9pfmplGwtL5MnJwGmttsTHx2xOT//z2TN+Xk6R0dDm8NQwk73+PKFtZkZX6LazAzt/X0/OH9CrTUvzs54ubHB2sOH/WQTE7zc2ODF2ZkvWWDCjhYKvMrlWA+HWQ+HeZXLURcKnf0gIkjSq9zL5fLddYEASYhS0a3w7rsLQLUnAi8RWmt2g0H0GgQBGRTcMMz/AdfWZTuEfWhGAAAAAElFTkSuQmCC';

describe('ImageCompress Static Utility', () => {
  let testFile: File;

  beforeEach(async () => {
    const blob = await (await fetch(ANGULAR_LOGO)).blob();
    testFile = new File([blob], 'angular_logo.png', { type: 'image/png' });
  });

  it('should be count byte', async () => {
    const result = ImageCompress.byteCount(ANGULAR_LOGO);
    expect(result === 1446).toBeTruthy();
  });

  it('should get orientation', async () => {
    const result = await ImageCompress.getOrientation(testFile);
    expect(result).toEqual(DOC_ORIENTATION.NotDefined);
  });

  it('should get data url from file', async () => {
    const result = await ImageCompress.fileToDataURL(testFile);
    expect(result).toEqual(ANGULAR_LOGO);
  });

  // it('should generate input upload for a single file and click on it', async () => {
  //   const mockRender: Partial<Renderer2> = {
  //     createElement: jasmine.createSpy(),
  //     setStyle: jasmine.createSpy(),
  //     setProperty: jasmine.createSpy(),
  //     listen: (target, eventName, callback) => () => {
  //       callback({ target: { value: 'test', files: [] } });
  //     },
  //   };

  //   const mockInput = jasmine.createSpyObj<HTMLInputElement>(['click']);
  //   (mockRender.createElement as jasmine.Spy).and.returnValue(mockInput);

  //   if (mockRender.listen) {
  //     mockRender.listen(mockInput, 'change', () => {
  //       console.log('TEST');
  //     })();
  //     mockRender.listen(mockInput, 'click', () => {
  //       console.log('TEST');
  //     })();
  //   }

  //   const result = await ImageCompress.generateUploadInput(
  //     mockRender as Renderer2,
  //     false
  //   );
  //   expect(mockInput.click).toHaveBeenCalled();

  //   expect(Object.keys(result)).toEqual(['image']);
  // });

  //
  // it('should constrain by max width', async () => {
  //   const ngxImageCompressService: NgxImageCompressService = TestBed.inject(NgxImageCompressService);
  //   const sizeSource = ngxImageCompressService.byteCount(ANGULAR_LOGO);
  //   const resultCompress = await ngxImageCompressService.compressFile(ANGULAR_LOGO, DOC_ORIENTATION.Up, 100, 80, 21);
  //   const sizeResult = ngxImageCompressService.byteCount(resultCompress);
  //   expect(sizeSource > sizeResult).toBeTruthy();
  // });
  //
  // it('should constrain by max height', async () => {
  //   const ngxImageCompressService: NgxImageCompressService = TestBed.inject(NgxImageCompressService);
  //   const sizeSource = ngxImageCompressService.byteCount(ANGULAR_LOGO);
  //   const resultCompress = await ngxImageCompressService.compressFile(ANGULAR_LOGO, DOC_ORIENTATION.Up, 100, 80, 28, 21);
  //   const sizeResult = ngxImageCompressService.byteCount(resultCompress);
  //   console.log(sizeSource, sizeResult)
  //   expect(sizeSource > sizeResult).toBeTruthy();
  // });
});
