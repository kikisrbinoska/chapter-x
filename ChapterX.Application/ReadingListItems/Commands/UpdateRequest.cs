using MediatR;

namespace ChapterX.Application.ReadingListItems.Commands
{
    public record UpdateRequest(int Id, int ReadingListId, int StoryId) : IRequest<UpdateResponse>;
}
