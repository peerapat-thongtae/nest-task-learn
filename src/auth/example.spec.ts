class FriendList {
  friends = [];

  addFriends(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friends`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('friend not found');
    }
    this.friends.splice(idx, 1);
  }
}

describe('Friendlists', () => {
  let friendList: FriendList;

  beforeEach(() => {
    friendList = new FriendList();
  });
  it('initalized friendlist', () => {
    expect(friendList.friends.length).toEqual(0);
  });

  it('add friend to friendlists', () => {
    friendList.addFriends('ssss');
    expect(friendList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendList.announceFriendship = jest.fn();
    expect(friendList.announceFriendship).not.toHaveBeenCalled();
    friendList.addFriends('areial');
    // เช็คฟังก์ชัน ว่าถูกเรียกหรือไม่
    expect(friendList.announceFriendship).toHaveBeenCalledWith('areial');
  });

  describe('Remove friend', () => {
    it('remove friend from the list', () => {
      friendList.addFriends('ariel');
      expect(friendList.friends[0]).toEqual('ariel');
      friendList.removeFriend('ariel');
      expect(friendList.friends[0]).toBeUndefined();
    });

    it('throw error friend not exists', () => {
      expect(() => friendList.removeFriend('ariel')).toThrowError();
    });
  });
});
