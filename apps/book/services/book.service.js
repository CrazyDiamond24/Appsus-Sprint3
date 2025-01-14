'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { eventBus } from './../../../services/event-bus.service.js'

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  addReview,
  removeReview,
  addGoogleBook,
  searchBook,
  checkExist,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.name))
    }
    if (filterBy.minPrice) {
      books = books.filter((book) => book.maxPrice >= filterBy.minPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

//CLASS CR - USE RETURN SAVE(BOOK) INSTEAD OF PUT.
function addReview(bookId, review) {
  review.id = utilService.makeId()
  return get(bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    return storageService.put(BOOK_KEY, book)
  })
}
//CLASS CR - USE RETURN SAVE(BOOK) INSTEAD OF PUT.
function removeReview(bookId, reviewId) {
  return get(bookId).then((book) => {
    const reviewIdx = book.reviews.findIndex((review) => review.id === reviewId)
    if (reviewIdx === -1) return Promise.reject('Failed to find the review!')
    book.reviews.splice(reviewIdx, 1)
    return storageService.put(BOOK_KEY, book)
  })
}

function getEmptyBook(title = '', price = 0) {
  return {
    id: '',
    title,
    price,
    thumbnail: 'https://scorpiobooks.co.nz/wp-content/uploads/2022/09/websitecoverplaceholder.jpg'
  };
}

function searchBook(searchTerm) {
  return axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then(res => {
          return res.data.items
      })
}
function checkExist(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function addGoogleBook(book) {
  console.log('addGoogleBook called with book:', book);
  var newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      authors: book.volumeInfo.authors,
      publishedDate: +book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      categories: book.volumeInfo.categories,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      language: book.volumeInfo.language,
      listPrice: {
          amount: null,
          currencyCode: null,
          isOnSale: null
      }
  }
  if (!newBook.authors) newBook.authors = [utilService.makeLorem(2).trim(), utilService.makeLorem(2).trim()]
  if (!newBook.categories) newBook.categories = [utilService.makeLorem(1).trim()]
  if (!newBook.description) newBook.description = utilService.makeLorem(100).trim()
  if (!newBook.pageCount) newBook.pageCount = utilService.getRandomIntInclusive(25, 600)
  if (!newBook.publishedDate) newBook.publishedDate = utilService.getRandomIntInclusive(1950, 2022)
  if (!newBook.subtitle) newBook.subtitle = utilService.makeLorem(30)
  newBook.listPrice.amount = utilService.getRandomIntInclusive(20, 200)
  newBook.listPrice.currencyCode = 'USD'
  newBook.listPrice.isOnSale = false
  if (newBook.publishedDate.length > 4) {
      var year = newBook.publishedDate.slice(0, 4)
      newBook.publishedDate = +year
  }
  return storageService.post(BOOK_KEY, newBook).then((book) => {
    console.log('New book added:', book)
    eventBus.emit('added', book)
    return book
  })
}

function _createBook(title, price = 50) {
  const book = getEmptyBook(title, price)
  book.id = utilService.makeId()
  return book
}

async function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = [
      {
        id: 'OXeMG8wNskc',
        title: 'metus hendrerit',
        subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
        authors: ['Barbara Cartland'],
        publishedDate: 2022,
        description:
          'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdumplacerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdumplacerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdumplacerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdumplacerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdumplacerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
        pageCount: 713,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://cdn.vox-cdn.com/thumbor/p-gGrwlaU4rLikEAgYhupMUhIJc=/0x0:1650x2475/1200x0/filters:focal(0x0:1650x2475):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13757614/817BsplxI9L.jpg',
        language: 'en',
        listPrice: {
          amount: 109,
          currencyCode: 'EUR',
          isOnSale: false,
        },
      },
      {
        id: 'JYOJa2NpSCq',
        title: 'morbi',
        subtitle: 'lorem euismod dictumst inceptos mi',
        authors: ['Barbara Cartland'],
        publishedDate: 1978,
        description:
          'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
        pageCount: 129,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://kbimages1-a.akamaihd.net/36bf2fd6-517b-4412-9621-8e0ccc5caf0f/1200/1200/False/notes-from-underground-8.jpg',
        language: 'sp',
        listPrice: {
          amount: 44,
          currencyCode: 'EUR',
          isOnSale: true,
        },
      },
      {
        id: '1y0Oqts35DQ',
        title: 'at viverra venenatis',
        subtitle: 'gravida libero facilisis rhoncus urna etiam',
        authors: ['Dr. Seuss'],
        publishedDate: 1999,
        description:
          'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
        pageCount: 972,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://rivetedlit.b-cdn.net/wp-content/uploads/2020/01/all-this-time-9781534466340_xlg.jpg',
        language: 'he',
        listPrice: {
          amount: 108,
          currencyCode: 'ILS',
          isOnSale: false,
        },
      },
      {
        id: 'kSnfIJyikTP',
        title: 'dictum',
        subtitle:
          'augue eu consectetur class curabitur conubia ligula in ullamcorper',
        authors: ['Danielle Steel'],
        publishedDate: 1978,
        description:
          'interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam',
        pageCount: 303,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://cdn.zoella.co.uk/wp-content/uploads/2022/04/13161426/Anne-of-Green-Gables-by-L.M.-Montgomery--940x1316.jpeg',
        language: 'en',
        listPrice: {
          amount: 30,
          currencyCode: 'EUR',
          isOnSale: true,
        },
      },
      {
        id: 'f4iuVmbuKCC',
        title: 'sem himenaeos aptent',
        subtitle: 'interdum per habitasse luctus purus est',
        authors: ['Dr. Seuss'],
        publishedDate: 2011,
        description:
          'et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed',
        pageCount: 337,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781607102113/the-adventures-of-sherlock-holmes-and-other-stories-9781607102113_hr.jpg',
        language: 'sp',
        listPrice: {
          amount: 19,
          currencyCode: 'USD',
          isOnSale: false,
        },
      },
      {
        id: 'U2rfZO6oBZf',
        title: 'mi ante posuere',
        subtitle:
          'sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus',
        authors: ['Leo Tolstoy'],
        publishedDate: 1978,
        description:
          'senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in',
        pageCount: 748,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://cdn.shopify.com/s/files/1/0011/6519/7378/products/IMG-6137_7ccee9b2-ce14-4462-9399-8bf5d7ec68be_600x.jpg?v=1651230340',
        language: 'en',
        listPrice: {
          amount: 91,
          currencyCode: 'USD',
          isOnSale: true,
        },
      },
      {
        id: 'xI0wrXaaAcq',
        title: 'non',
        subtitle:
          'leo tortor per dapibus mattis ut conubia porttitor ligula viverra',
        authors: ['Leo Tolstoy'],
        publishedDate: 2011,
        description:
          'nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque',
        pageCount: 65,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://mpd-biblio-covers.imgix.net/9780805093391.jpg',
        language: 'he',
        listPrice: {
          amount: 90,
          currencyCode: 'USD',
          isOnSale: false,
        },
      },
      {
        id: '9laHCEdSpFy',
        title: 'tristique',
        subtitle: 'consectetur a eu tincidunt condimentum amet nisi',
        authors: ['Dr. Seuss'],
        publishedDate: 1999,
        description:
          'magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem',
        pageCount: 299,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://s26162.pcdn.co/wp-content/uploads/2018/02/gatsby-original2.jpg',
        language: 'he',
        listPrice: {
          amount: 176,
          currencyCode: 'EUR',
          isOnSale: false,
        },
      },
      {
        id: 'nGhVwZvGCGp',
        title: 'urna ornare gravida',
        subtitle:
          'sem vestibulum semper convallis pharetra tempor himenaeos ut',
        authors: ['Jin Yong'],
        publishedDate: 2011,
        description:
          'porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla',
        pageCount: 803,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://shereads.com/wp-content/uploads/2021/10/TheFirekeepersDaughter_AngelineBoulley-800x1208.jpg',
        language: 'sp',
        listPrice: {
          amount: 116,
          currencyCode: 'USD',
          isOnSale: true,
        },
      },
      {
        id: 'Q8Q9Lsd03BD',
        title: 'consequat neque volutpat',
        subtitle:
          'vel quis taciti fermentum feugiat ullamcorper curae praesent',
        authors: ['Dr. Seuss'],
        publishedDate: 1978,
        description:
          'curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare',
        pageCount: 891,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://m.media-amazon.com/images/I/71CkAJOxkrL._AC_UF1000,1000_QL80_.jpg',
        language: 'en',
        listPrice: {
          amount: 145,
          currencyCode: 'EUR',
          isOnSale: false,
        },
      },
      {
        id: 'bd7a76kARao',
        title: 'risus',
        subtitle: 'pretium bibendum pharetra curabitur quisque dictumst',
        authors: ['Danielle Steel'],
        publishedDate: 2018,
        description:
          'auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus',
        pageCount: 86,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://m.media-amazon.com/images/I/51pPe1mxKsL._AC_UF1000,1000_QL80_.jpg',
        language: 'sp',
        listPrice: {
          amount: 157,
          currencyCode: 'ILS',
          isOnSale: true,
        },
      },
      {
        id: 'qKyG0vqeO3e',
        title: 'interdum etiam vulputate',
        subtitle: 'velit sapien eget tincidunt nunc tortor',
        authors: ['Danielle Steel'],
        publishedDate: 2018,
        description:
          'aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad',
        pageCount: 882,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/romantic-poetry-book-cover-design-template-cb700ec0a42a3219c1df0413f6587523_screen.jpg?ts=1637016013',
        language: 'sp',
        listPrice: {
          amount: 57,
          currencyCode: 'USD',
          isOnSale: true,
        },
      },
      {
        id: '2RvT48ZNInj',
        title: 'sagittis justo',
        subtitle: 'etiam primis proin praesent placerat nisi fermentum nisi',
        authors: ['Agatha Christie'],
        publishedDate: 2011,
        description:
          'nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus',
        pageCount: 598,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://www.writersdigest.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTcxMDY0MzgwMjEwNjE5NjUz/image-placeholder-title.jpg',
        language: 'en',
        listPrice: {
          amount: 167,
          currencyCode: 'ILS',
          isOnSale: false,
        },
      },
      {
        id: '5z2s9pDXAYj',
        title: 'quam ullamcorper himenaeos',
        subtitle: 'ut placerat eu dapibus sapien sodales laoreet',
        authors: ['Danielle Steel'],
        publishedDate: 1999,
        description:
          'etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam',
        pageCount: 608,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://m.media-amazon.com/images/I/71rtzg36RAL._AC_UF1000,1000_QL80_.jpg',
        language: 'he',
        listPrice: {
          amount: 150,
          currencyCode: 'USD',
          isOnSale: true,
        },
      },
      {
        id: 'zBZu5cDEWha',
        title: 'quis',
        subtitle: 'suscipit turpis etiam turpis libero lobortis',
        authors: ['Jin Yong'],
        publishedDate: 2011,
        description:
          'etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor',
        pageCount: 583,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://cdn.fable.co/covers/9781510768192.jpg',
        language: 'en',
        listPrice: {
          amount: 58,
          currencyCode: 'ILS',
          isOnSale: true,
        },
      },
      {
        id: 'aOI7tQuPZ2f',
        title: 'aliquam aliquet dapibus',
        subtitle:
          'neque eu purus euismod placerat adipiscing odio egestas consequat',
        authors: ['Leo Tolstoy'],
        publishedDate: 2011,
        description:
          'dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt',
        pageCount: 497,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/b164aa10953207.560ef1bcba0e7.jpg',
        language: 'en',
        listPrice: {
          amount: 78,
          currencyCode: 'USD',
          isOnSale: false,
        },
      },
      {
        id: 'WBooB82Uvwu',
        title: 'class',
        subtitle:
          'elit enim ultricies amet imperdiet a molestie class elementum venenatis',
        authors: ['Danielle Steel'],
        publishedDate: 1999,
        description:
          'rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla',
        pageCount: 804,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/22739/optimized_large_thumb_children-stories-book-cover-541__1_.jpg',
        language: 'en',
        listPrice: {
          amount: 118,
          currencyCode: 'ILS',
          isOnSale: false,
        },
      },
      {
        id: 'xm1z5bbZjlS',
        title: 'vitae',
        subtitle: 'class habitant at commodo semper ligula a bibendum',
        authors: ['Leo Tolstoy'],
        publishedDate: 1999,
        description:
          'himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus',
        pageCount: 231,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://static-cse.canva.com/blob/921489/RedandBeigeCuteIllustrationYoungAdultBookCover.jpg',
        language: 'he',
        listPrice: {
          amount: 60,
          currencyCode: 'EUR',
          isOnSale: false,
        },
      },
      {
        id: 'u3j6QIKLlJb',
        title: 'rhoncus vivamus',
        subtitle:
          'nullam class risus amet senectus scelerisque etiam curabitur',
        authors: ['Agatha Christie'],
        publishedDate: 1978,
        description:
          'torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis',
        pageCount: 652,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F03%2Fa-clockwork-orange-2000.jpg',
        language: 'he',
        listPrice: {
          amount: 110,
          currencyCode: 'USD',
          isOnSale: true,
        },
      },
      {
        id: 'vxYYYdVlEH3',
        title: 'donec mi ullamcorper',
        subtitle:
          'varius malesuada augue molestie sollicitudin faucibus mi eu tempus',
        authors: ['William Shakespeare'],
        publishedDate: 2011,
        description:
          'aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed',
        pageCount: 904,
        categories: ['Computers', 'Hack'],
        thumbnail: 'https://marketplace.canva.com/EAE7-oQF8qg/1/0/1003w/canva-purple-feminine-love-story-novel-book-cover-7RKHodr01_c.jpg',
        language: 'sp',
        listPrice: {
          amount: 186,
          currencyCode: 'ILS',
          isOnSale: true,
        },
      },
    ]

    utilService.saveToStorage(BOOK_KEY, books);
  }
  return books
}

