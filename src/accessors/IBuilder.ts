import { IMessage, IMessageAttachment } from '../messages';
import { IRoom, RoomType } from '../rooms';
import { IUser } from '../users';

/**
 * This accesor provides a nice builder interface for
 * not only creating but also modifying the
 * various objects and then submitting them.
 */
export interface IBuilder {
    /**
     * Builds a new message with the ability to pass in a message
     * object to continue building on.
     *
     * @param msg (optional) the message to build on top of
     */
    buildMessage(msg?: IMessage): IMessageBuilder;

    /**
     * Builds a new room with the ability to pass in a room object
     * to continue building on.
     *
     * @param room (optional) the room to build on top of
     */
    buildRoom(room?: IRoom): IRoomBuilder;

    /**
     * Modifies an existing message.
     *
     * @param msgId the id of the existing message to modfiy and build
     * @param updater the user who is updating the message
     */
    modifyMessage(msgId: string, updater: IUser): IMessageBuilder;

    /**
     * Modifies an existing room.
     *
     * @param roomId the id of the existing room to modify and build
     * @param updater the user who is updating the room
     */
    modifyRoom(roomId: string, updater: IUser): IRoomBuilder;

    /**
     * Finishes and sends the message, the builder instance
     * will no longer be valid and to build a new message you
     * will have to get a new message builder instance.
     *
     * @param builder the message builder instance
     */
    finishMessage(builder: IMessageBuilder): IMessage;

    /**
     * Finishes and creates the room, the builder instance
     * will no longer be valid and to build a new room you
     * will have to get a new room builder instance.
     *
     * @param builder the room builder instance
     */
    finishRoom(builder: IRoomBuilder): IRoom;
}

/**
 * This accesor provides a nice builder interface for creating
 * the various objects and then submitting them.
 */
export interface INewBuilder {
    /**
     * Builds a new message with the ability to pass in a message
     * object to continue building on.
     *
     * @param msg (optional) the message to build on top of
     */
    buildMessage(msg?: IMessage): IMessageBuilder;

    /**
     * Finishes and sends the message, the builder instance
     * will no longer be valid and to build a new message you
     * will have to get a new message builder instance.
     *
     * @param builder the message builder instance
     */
    sendMessage(builder: IMessageBuilder): IMessage;

    /**
     * Builds a new room with the ability to pass in a room object
     * to continue building on.
     *
     * @param room (optional) the room to build on top of
     */
    buildRoom(room?: IRoom): IRoomBuilder;

    /**
     * Finishes and creates the room, the builder instance
     * will no longer be valid and to build a new room you
     * will have to get a new room builder instance.
     *
     * @param builder the room builder instance
     */
    createRoom(builder: IRoomBuilder): IRoom;
}

/**
 * This accesor provides a nice builder interface for modifying
 * the various objects and then saving them them.
 */
export interface IModifyBuilder {
    /**
     * Modifies an existing message.
     *
     * @param msgId the id of the existing message to modfiy and build
     * @param updater the user who is updating the message
     */
    modifyMessage(msgId: string, updater: IUser): IMessageBuilder;

    /**
     * Modifies an existing room.
     *
     * @param roomId the id of the existing room to modify and build
     * @param updater the user who is updating the room
     */
    modifyRoom(roomId: string, updater: IUser): IRoomBuilder;
}

export interface IMessageBuilder {
    /**
     * Sets the room where this message should be sent to.
     *
     * @param room the room where to send
     */
    setRoom(room: IRoom): IMessageBuilder;

    /**
     * Sets the sender of this message.
     *
     * @param sender the user sending the message
     */
    setSender(sender: IUser): IMessageBuilder;

    /**
     * Sets the text of the message.
     *
     * @param text the actual text
     */
    setText(text: string): IMessageBuilder;

    /**
     * Sets the emoji to use for the avatar, this overwrites the current avatar
     * whether it be the user's or the avatar url provided.
     *
     * @param emoji the emoji code
     */
    setEmojiAvatar(emoji: string): IMessageBuilder;

    /**
     * Sets the url which to display for the avatar, this overwrites the current
     * avatar whether it be the user's or an emoji one.
     *
     * @param avatarUrl image url to use as the avatar
     */
    setAvatarUrl(avatarUrl: string): IMessageBuilder;

    /**
     * Sets the display text of the sender's username that is visible.
     *
     * @param alias the username alias to display
     */
    setUsernameAlias(alias: string): IMessageBuilder;

    /**
     * Adds one attachment to the message's list of attachments, this will not
     * overwrite any existing ones but just adds.
     *
     * @param attachment the attachment to add
     */
    addAttachment(attachment: IMessageAttachment): IMessageBuilder;

    /**
     * Sets the attachments for the message, replacing and destroying all of the current attachments.
     *
     * @param attachments array of the attachments
     */
    setAttachments(attachments: Array<IMessageAttachment>): IMessageBuilder;

    /**
     * Replaces an attachment at the given position (index).
     * If there is no attachment at that position, there will be an error thrown.
     *
     * @param position the index of the attachment to replace
     * @param attachment the attachment to replace with
     */
    replaceAttachment(position: number, attachment: IMessageAttachment): IMessageBuilder;

    /**
     * Removes an attachment at the given position (index).
     * If there is no attachment at that position, there will be an error thrown.
     *
     * @param position the index of the attachment to remove
     */
    removeAttachment(position: number): IMessageBuilder;

    /**
     * Sets the user who is updating this message.
     * This is required if you are modifying an existing message.
     *
     * @param user the updater
     */
    setUpdater(user: IUser): IMessageBuilder;

    /**
     * Gets the resulting message that has been built up to the point of calling it.
     * Note: modifying the returned value will have no effect.
     */
    getMessage(): IMessage;
}

export interface IRoomBuilder {
    /**
     * Sets the creator of the room.
     *
     * @param creator the user who created the room
     */
    setCreator(creator: IUser): IRoomBuilder;

    /**
     * Sets the name of this room, it must align to the rules of Rocket.Chat room
     * names otherwise there will be an error thrown.
     *
     * @param name the name of the room
     */
    setName(name: string): IRoomBuilder;

    /**
     * Sets the room's type.
     *
     * @param type the room type
     */
    setType(type: RoomType): IRoomBuilder;

    /**
     * Sets whether this room should be a default room or not.
     * This means that new users will automatically join this room
     * when they join the server.
     *
     * @param isDefault room should be default or not
     */
    setDefault(isDefault: boolean): IRoomBuilder;

    /**
     * Adds a user to the room, these are by username until further notice.
     *
     * @param username the user's username to add to the room
     */
    addUsername(username: string): IRoomBuilder;

    /**
     * Sets the usernames of who are joined to the room.
     *
     * @param users the list of usernames
     */
    setUsers(users: Array<string>): IRoomBuilder;

    /**
     * Gets the resulting room that has been built up to the point of calling this method.
     * Note: modifying the returned value will have no effect.
     */
    getRoom(): IRoom;
}
