using MediatR;

namespace ChapterX.Application.ReadingListItems.Commands
{
    public record AddRequest(int ReadingListId, int StoryId) : IRequest<AddResponse>;
}
