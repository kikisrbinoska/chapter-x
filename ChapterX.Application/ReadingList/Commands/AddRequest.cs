using MediatR;

namespace ChapterX.Application.ReadingList.Commands
{
    public record AddRequest(string Name, string? Content, bool IsPublic, int UserId) : IRequest<AddResponse>;
}
