var FriendList = /** @class */ (function () {
    function FriendList() {
        this.friends = [];
    }
    FriendList.prototype.addFriends = function (name) {
        this.friends.push(name);
        this.announceFriendship(name);
    };
    FriendList.prototype.announceFriendship = function (name) {
        global.console.log(name + " is now a friends");
    };
    FriendList.prototype.removeFriend = function (name) {
        var idx = this.friends.indexOf(name);
        if (idx === -1) {
            throw new Error('friend not found');
        }
        this.friends.splice(idx, 1);
    };
    return FriendList;
}());
describe('Friendlists', function () {
    var friendList;
    beforeEach(function () {
        friendList = new FriendList();
    });
    it('initalized friendlist', function () {
        expect(friendList.friends.length).toEqual(0);
    });
    it('add friend to friendlists', function () {
        friendList.addFriends('ssss');
        expect(friendList.friends.length).toEqual(1);
    });
    it('announces friendship', function () {
        friendList.announceFriendship = jest.fn();
        expect(friendList.announceFriendship).not.toHaveBeenCalled();
        friendList.addFriends('areial');
        // เช็คฟังก์ชัน ว่าถูกเรียกหรือไม่
        expect(friendList.announceFriendship).toHaveBeenCalledWith('areial');
    });
    describe('Remove friend', function () {
        it('remove friend from the list', function () {
            friendList.addFriends('ariel');
            expect(friendList.friends[0]).toEqual('ariel');
            friendList.removeFriend('ariel');
            expect(friendList.friends[0]).toBeUndefined();
        });
        it('throw error friend not exists', function () {
            expect(function () { return friendList.removeFriend('ariel'); }).toThrowError();
        });
    });
});
