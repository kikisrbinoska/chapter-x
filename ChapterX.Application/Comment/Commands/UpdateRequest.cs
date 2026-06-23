using MediatR;

namespace ChapterX.Application.Comment.Commands
{
    public record UpdateRequest(int Id, string Content, int CallerId = 0) : IRequest<UpdateResponse>;
}
