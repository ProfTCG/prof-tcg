import { Selector } from 'testcafe';

class MarketplacePage {
  constructor() {
    this.pageId = '#marketplace';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const marketplacePage = new MarketplacePage();
