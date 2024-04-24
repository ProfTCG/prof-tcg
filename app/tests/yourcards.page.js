import { Selector } from 'testcafe';

class YourCardsPage {
  constructor() {
    this.pageId = '#your-cards';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const yourcardsPage = new YourCardsPage();
