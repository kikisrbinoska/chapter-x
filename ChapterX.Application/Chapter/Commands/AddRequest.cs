using MediatR;

namespace ChapterX.Application.Chapter.Commands
{
    public record AddRequest(
        int Number,
        string Name,
        string Title,
        string Content,
        int StoryId
    ) : IRequest<AddResponse>;
}
